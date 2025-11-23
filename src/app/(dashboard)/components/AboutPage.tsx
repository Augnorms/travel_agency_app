import React, { useEffect, useState } from "react";
import Dropdown from "../reusables/ActionComponent";
import Button from "../reusables/Button";
import Modal from "../reusables/Modal";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";
import { DeleteDialogue } from "../reusables/DeleteDialogue";
import { TextArea } from "../reusables/TextArea";
import { Inputs } from "../reusables/Input";


export default function AboutPage() {
  const [successBlockStatus, setSuccessBlockStatus] = useState(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | string>(0);
  const [loadingData, setLoadingData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [_isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
  });
  const [aboutContent, setAboutContent] = useState({
    id: 0,
    title: "",
    description: "",
    created_at: "",
    updated_at: ""
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleMouseLeave = () => {
    setDropDownId(null);
    setIsDropdownOpen(false);
  };

  const emitAction = (userId: string | number, action: string) => {

    if (action === "Delete") {
      setDeleteId(userId);
      setIsDeleteModalOpen(true);

    } else {
      setIsEdit(true);
      setFormData({
        id: aboutContent.id,
        description: aboutContent.description,
        title: aboutContent.title,
      });
      setIsOpen(true);
    }
  };

  const handleDelete = async() => {
     setLoadingData(true);
     try{
      const response = await fetch("/api/about/delete-about?id=" + deleteId, {
        method: "DELETE",
        credentials: 'include',  // This is needed for sending cookies
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setSuccessBlockStatus(true);
        setBlockMessage("Content deleted successfully");
        setIsDeleteModalOpen(false);
        fetchAboutContent();
      }
     }catch(error){
      console.error("Error deleting about content:", error);
      setErrorBlockStatus(true);
      setBlockMessage("Error deleting about content: " + error);
     }finally{
      setLoadingData(false);
     }
  };

  //delete cancel handler
  const handledeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  //submit handler
  const handleSubmit = async (e: React.FormEvent) => {
      setLoadingData(true);
      try {
        const response = await fetch( isEdit ? "/api/about/update-about" : "/api/about/save-about", {
          method: isEdit ? "PATCH" : "POST",
          credentials: 'include',  // This is needed for sending cookies
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessBlockStatus(true);
          setBlockMessage(isEdit ? "Content updated successfully" : "Content added successfully");
          setIsOpen(false);

          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
            onClose();
            fetchAboutContent();

          }, 3000);
        }

      } catch (error) {
        console.error("Error adding about content:", error);
        setErrorBlockStatus(true);
        setBlockMessage("Error adding about content: " + error);

        setTimeout(() => {
          setErrorBlockStatus(false);
          setBlockMessage("");
        }, 3000);
      } finally {
        setLoadingData(false);
      }
    
  };

  //fetch about content
  const fetchAboutContent = async () => {
    try {
      const response = await fetch("/api/about/get-about", {
        method: "GET",
        credentials: 'include',  // This is needed for sending cookies
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const result = await response.json();

        console.log("API Result:", result.data);

        // result.data is the actual about record
        if (result.data) {
          setAboutContent(result.data);  // Remove array brackets
        } else {
          setAboutContent({
            id: 0,
            title: "",
            description: "",
            created_at: "",
            updated_at: ""
          });
        }

        console.log("About Content:", aboutContent);
      }

    } catch (error) {
      console.error("Error fetching about content:", error);
      setErrorBlockStatus(true);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  //close modal handler
  const onClose = () => {
    setIsOpen(false);
    setFormData({
      id: 0,
      description: "",
      title: "",
    });
    setIsEdit(false);
  };

  return (
    <div className="h-[80vh] px-4 py-4 space-y-5">
      <SuccessBlock blockControl={successBlockStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />

      <DeleteDialogue
        onDelete={handleDelete}
        onCancel={handledeleteCancel}
        popup={isDeleteModalOpen}
        text={" this content ?"}
        loading={loadingData}
        disabled={loadingData}
      />

      <Modal isOpen={isOpen} onClose={onClose} maxWidth="50%" title={isEdit ? "Edit Content" : "Add Content"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="gap-4">
            <Inputs
              type="text"
              labelOne="Title"
              placeholder="Enter title"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={formData.title}
              onChange={handleInputChange}
              id="title"
            />

            <TextArea
              style="w-full h-[30vh] border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              placeholder="Enter about content here.."
              id=""
              value={formData.description}
              onChange={handleTextareaChange}
              label=""
            />
          </div>
          <div className="flex justify-end">
            <Button
              buttonLabel="Cancel"
              className="px-4 py-2 rounded border hover:bg-white/20 mr-2"
              onClick={onClose}
            />
            <Button
              buttonLabel={isEdit ? "Update content" : "Add content"}
              className="border p-2 rounded-md text-white bg-cyan-400"
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
              loading={loadingData}
            />
          </div>
        </form>
      </Modal>

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold">About Page Management</h1>

      <h3 className="text-lg font-semibold text-gray-700">
        Content Count: <span className="text-cyan-600">{ }</span>
      </h3>


      <div className="flex items-center justify-between">
        <div className="max-w-[300px] w-full">

        </div>

        <Button
          buttonLabel="Add About Content"
          className="border p-2 rounded-md text-white bg-cyan-400"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <hr />

      {/* content card here*/}
      <div>
        <div className="grid grid-cols-1 gap-6 mt-6">
          {/* Sample card - replace with your actual data mapping */}
          <div
            className="bg-white rounded-lg shadow-md p-6 relative border-2 border-cyan-500"
            onMouseLeave={() => setDropDownId(null)}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{aboutContent?.title}</h3>
              <div className="relative">
                <button
                  onClick={() => setDropDownId(aboutContent?.id)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <img
                    src="/svg/eclipse.svg"
                    alt="More options"
                    className="h-5 w-5 cursor-pointer"
                  />
                </button>

                <div className="absolute right-[-2px] top-[8px] mt-2 z-20">
                  {dropDownId !== null && (
                    <Dropdown
                      onMouseLeave={handleMouseLeave}
                      dropdownItems={[
                        { id: aboutContent?.id, image: "/svg/edit.svg", label: "Edit", dataCy: "edit" },
                        { id: aboutContent?.id, image: "/svg/delete.svg", label: "Delete", dataCy: "delete" }
                      ]}
                      emitAction={emitAction}
                    />
                  )}
                </div>
              </div>
            </div>
            <p className="text-cyan-600 line-clamp-4">
              {aboutContent?.description} 
            </p>
            <p className="text-sm text-gray-500 mt-4 font-semibold">Last updated: <span className="text-cyan-600  font-bold">{(aboutContent?.updated_at).split("T")[0]}</span></p>
          </div>
        </div>
      </div>

    </div>
  )
}
