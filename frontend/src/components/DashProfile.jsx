import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput, Alert, Modal } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserFailure, setUpdateUserFailure] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const passwordValueRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setUpdateUserSuccess(null);
    setUpdateUserFailure(null);
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setImageFileUploadError(null);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (err) => {
        setImageFileUploadError(
          "Could not upload image (File must be less that 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUpdateUserSuccess(null);
    setUpdateUserFailure(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordValueRef.current) {
      passwordValueRef.current.value = "";
    }
    if (Object.keys(formData).length === 0) {
      setUpdateUserFailure("No changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserSuccess(null);
        setUpdateUserFailure(data.message);
        setImageFileUploadError(null);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserFailure(null);
        setUpdateUserSuccess("User updated successfully");
        setImageFileUploadError(null);
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserSuccess(null);
      setUpdateUserFailure(err.message);
      setImageFileUploadError(null);
    }
  };

  const handleDeleteUser = async () => {
    dispatch(deleteStart());
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (err) {
      dispatch(deleteFailure(err.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">My Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative h-32 w-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileURL || currentUser.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-indigo-400 ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}

          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="new password"
            onChange={handleChange}
            ref={passwordValueRef}
          />
          <Button type="submit" color="indigo" disabled={imageFileUploading}>
            Update
          </Button>
          {currentUser.isAdmin && (
            <Link to={"/create-post"}>
              <Button type="button" color="teal" className="w-full">
                Create a Post
              </Button>
            </Link>
          )}
        </form>
        {updateUserSuccess && (
          <Alert className="mt-5" color="success">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserFailure && (
          <Alert className="mt-5" color="failure">
            {updateUserFailure}
          </Alert>
        )}
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
        <div className="text-red-500 flex justify-between mt-5 mb-8">
          <span onClick={() => setShowModal(true)} className="cursor-pointer">
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </span>
        </div>
        <Modal
          show={showModal}
          onClick={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </h3>
              <div className="flex justify-between px-3">
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes, I'm sure
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default DashProfile;
