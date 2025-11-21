"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "../reusables/TableComponent";
import Dropdown from "../reusables/ActionComponent";
import { SearchComp } from "../reusables/SearchComp";
import Button from "../reusables/Button";
import Modal from "../reusables/Modal";
import { Inputs } from "../reusables/Input";
import { capitalizeWords } from "@/utils/helpers";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";
import { DeleteDialogue } from "../reusables/DeleteDialogue";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  gender?: string;
  nationality?: string;
  residence?: string;
  role?: string;
  date_of_birth?: string;
  created_at?: string;
};

export default function UsersPage() {
  // Table column headers
  const headers = [
    { key: "id", label: "ID" },
    { key: "firstname", label: "First Name" },
    { key: "lastname", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "gender", label: "Gender" },
    { key: "nationality", label: "Nationality" },
    { key: "residence", label: "Residence" },
    { key: "action", label: "Action" },
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    gender: "",
    residence: "",
    nationality: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });

  const [editData, setEditData] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    gender: "",
    residence: "",
    nationality: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successBlockStatus, setSuccessBlockStatus] = useState(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | string>(0);
  const [isEdit, setIsEdit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Handle change for form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEdit) {
      setEditData({ ...editData, [e.target.id]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  //handle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

useEffect(() => {
  const isCreateMismatch = formData.password !== formData.confirm_password;
  const isEditMismatch = editData.password !== editData.confirm_password;

  // passwordError should be true ONLY if either mode has mismatch
  setPasswordError(isCreateMismatch || isEditMismatch);

}, [
  formData.password,
  formData.confirm_password,
  editData.password,
  editData.confirm_password
]);



  // Handle mouse click for dropdown in table
  const handleMouseClick = (id: number) => {
    setDropDownId(id);
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle mouse leave for dropdown in table
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setDropDownId(null);
  };

  // Emit action for delete and update
  const emitAction = (userId: string | number, action: string) => {

    if (action === "Delete") {
      setDeleteId(userId);
      setIsDeleteModalOpen(true);

    } else {

      setIsEdit(true);
      const user = users.find((user) => user.id === userId);
      if (user) {
        if (user) {
          setEditData({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role || '',
            gender: user.gender || '',
            residence: user.residence || '',
            nationality: user.nationality || '',
            date_of_birth: user.date_of_birth || '',
            password: '',
            confirm_password: '',
          });
        }
      }
      setIsOpen(true);
    }
  };

  // Custom cell rendering
  const renderCellContent = (headerKey: string, item: User | any) => {
    switch (headerKey) {
      case "action":
        return (
          <div className="relative">
            <img
              src="/svg/eclipse.svg"
              alt="actions"
              className="cursor-pointer"
              onClick={() => handleMouseClick(item.id)}
            />

            {isDropdownOpen && dropDownId === item.id && (
              <div className="absolute right-0 mt-2 z-20">
                <Dropdown
                  onMouseLeave={handleMouseLeave}
                  dropdownItems={[
                    { id: item.id, image: "/svg/edit.svg", label: "Edit", dataCy: "edit" },
                    { id: item.id, image: "/svg/delete.svg", label: "Delete", dataCy: "delete" }
                  ]}
                  emitAction={emitAction}
                />
              </div>
            )}
          </div>
        );
      default:
        return item[headerKey as keyof User] ?? "--";
    }
  };


  /* ====================== Form Submit for creation and updating======================*/
  const handleSubmit = async (e: React.FormEvent) => {
    // Create data
    const finalFormData = {
      "firstname": capitalizeWords(formData.firstname),
      "lastname": capitalizeWords(formData.lastname),
      "email": formData.email,
      "role": formData.role,
      "gender": capitalizeWords(formData.gender),
      "nationality": capitalizeWords(formData.nationality),
      "residence": capitalizeWords(formData.residence),
      "date_of_birth": formData.date_of_birth,
      "password": formData.password,
    }

    // Edit data
    const finalEditData = {
      "id": editData.id,
      "firstname": capitalizeWords(editData.firstname),
      "lastname": capitalizeWords(editData.lastname),
      "email": editData.email,
      "role": editData.role,
      "gender": capitalizeWords(editData.gender),
      "nationality": capitalizeWords(editData.nationality),
      "residence": capitalizeWords(editData.residence),
      "date_of_birth": editData.date_of_birth,
      "password": editData.password,
    }

    try {
      setLoadingData(true);
      const response = await fetch(isEdit ? "/api/users/update-users" : "/api/users/save-users", {
        method: isEdit ? "PUT" : "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isEdit ? finalEditData : finalFormData),
      });

      if (response.ok) {
        setSuccessBlockStatus(true);
        setBlockMessage(isEdit ? "User updated successfully" : "User created successfully");
        setIsOpen(false);

        setTimeout(() => {
          setSuccessBlockStatus(false);
          setBlockMessage("");
          onClose();
          fetchUsers();
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorBlockStatus(true);
      setBlockMessage("Error creating user: " + error);

      setTimeout(() => {
        setErrorBlockStatus(false);
        setBlockMessage("");
      }, 3000);
    } finally {
      setLoadingData(false);
    }
  };

  /* ====================== Fetch user ======================*/
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users/get-users", {
        credentials: 'include',  // This is needed for sending cookies
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if (response.ok) {
        setUsers(data.data);
        setAllUsers(data.data);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ====================== Delete user ======================*/
  const handleDelete = async () => {
    try {
      setLoadingData(true);

      const response = await fetch("/api/users/delete-users", {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deleteId }),
      });

      if (response.ok) {
        setSuccessBlockStatus(true);
        setBlockMessage("User deleted successfully");
        setIsDeleteModalOpen(false);

        setTimeout(() => {
          setSuccessBlockStatus(false);
          setBlockMessage("");
          fetchUsers();
        }, 3000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorBlockStatus(true);
      setBlockMessage("Error deleting user: " + error);

      setTimeout(() => {
        setErrorBlockStatus(false);
        setBlockMessage("");
      }, 3000);

    } finally {
      setLoadingData(false);
    }
  };

  const handledeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      gender: "",
      nationality: "",
      residence: "",
      date_of_birth: "",
      password: "",
      confirm_password: "",
    });

    setEditData({
      id: 0,
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      gender: "",
      residence: "",
      nationality: "",
      date_of_birth: "",
      password: "",
      confirm_password: "",
    });
    setIsEdit(false);
  };

  /*handle search */
  // Add this state near your other states
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);


  // Modify your handleSearch function
  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setUsers(allUsers);  // restore original list
      return;
    }

    const filtered = allUsers.filter((user) =>
      user.firstname.toLowerCase().includes(term.toLowerCase()) ||
      user.lastname.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase()) ||
      user.role?.toLowerCase().includes(term.toLowerCase()) ||
      user.nationality?.toLowerCase().includes(term.toLowerCase()) ||
      user.residence?.toLowerCase().includes(term.toLowerCase())
    );

    setUsers(filtered);
  };


  return (
    <div className="h-[80vh] px-4 py-4 space-y-5">
      <SuccessBlock blockControl={successBlockStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />

      <DeleteDialogue
        onDelete={handleDelete}
        onCancel={handledeleteCancel}
        popup={isDeleteModalOpen}
        text={"user: " + String(deleteId) + " ?"}
        loading={loadingData}
        disabled={loadingData}
      />

      <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit User" : "Create User"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inputs
              type="text"
              labelOne="First Name"
              placeholder="Enter first name"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.firstname : formData.firstname}
              onChange={handleChange}
              id="firstname"
            />

            <Inputs
              type="text"
              labelOne="Last Name"
              placeholder="Enter last name"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.lastname : formData.lastname}
              onChange={handleChange}
              id="lastname"
            />

            <Inputs
              type="email"
              labelOne="Email"
              placeholder="Enter email"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.email : formData.email}
              onChange={handleChange}
              id="email"
            />

            <Inputs
              type="text"
              labelOne="Role"
              placeholder="Enter role"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.role : formData.role}
              onChange={handleChange}
              id="role"
            />

            <Inputs
              type="text"
              labelOne="Gender"
              placeholder="Enter gender"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.gender : formData.gender}
              onChange={handleChange}
              id="gender"
            />

            <Inputs
              type="text"
              labelOne="Residence"
              placeholder="Enter residence"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.residence : formData.residence}
              onChange={handleChange}
              id="residence"
            />

            <Inputs
              type="text"
              labelOne="Nationality"
              placeholder="Enter nationality"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.nationality : formData.nationality}
              onChange={handleChange}
              id="nationality"
            />

            <Inputs
              type="date"
              labelOne="Date of Birth"
              placeholder="Select date of birth"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={isEdit ? editData.date_of_birth : formData.date_of_birth}
              onChange={handleChange}
              id="date_of_birth"
            />

            <Inputs
              type={showPassword ? "text" : "password"}
              labelOne="Password"
              placeholder="Enter password"
              style={passwordError ? "w-full border px-3 py-2 ring-2 ring-red-500 rounded-xl border" : "w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"}
              value={isEdit ? editData.password : formData.password}
              onChange={handleChange}
              id="password"
              iconUserPass={showPassword}
              onShowpass={handleShowPassword}
              addpasswordVisibility
            />

            <Inputs
              type={showPassword ? "text" : "password"}
              labelOne="Confirm Password"
              placeholder="Enter confirm password"
              style={passwordError ? "w-full border px-3 py-2 ring-2 ring-red-500 rounded-xl border" : "w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"}
              value={isEdit ? editData.confirm_password : formData.confirm_password}
                  onChange={handleChange}
                  id="confirm_password"
              iconUserPass={showPassword}
              onShowpass={handleShowPassword}
              addpasswordVisibility
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              buttonLabel="Cancel"
              className="px-4 py-2 rounded border hover:bg-white/20"
              onClick={onClose}
            />

            {!isEdit ? <Button
              buttonLabel={"Submit"}
              className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600"
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
              loading={loadingData}
              disabled={loadingData || !formData.firstname || !formData.lastname || !formData.email || !formData.role || !formData.gender || !formData.nationality || !formData.residence || !formData.date_of_birth || passwordError}
            />
              :
              <Button
                buttonLabel={"Update"}
                className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600"
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
                loading={loadingData}
              />
            }
          </div>
        </form>
      </Modal>

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold">Users Management</h1>

      <h3 className="text-lg font-semibold text-gray-700">
        User Count: <span className="text-cyan-600">{users.length}</span>
      </h3>


      <div className="flex items-center justify-between">
        <div className="max-w-[300px] w-full">
          <SearchComp
            classStyle="ring-2 ring-cyan-500 p-2 rounded-xl border"
            placeholder="Search users..."
            handlesearch={(e) => handleSearch(e.target.value)}
            value={searchTerm}
          />

        </div>

        <Button
          buttonLabel="Create Account"
          className="border p-2 rounded-md text-white bg-cyan-400"
          onClick={() => setIsOpen(true)}
        />
      </div>


      {/* TABLE */}
      <div className="h-[65vh]">
        <TableComponent
          headers={headers}
          classhead="bg-gray-100"
          items={users}
          renderCellContent={renderCellContent}
        />
      </div>
    </div>
  );
}
