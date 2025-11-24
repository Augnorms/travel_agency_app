"use client"

import React, { useEffect, useState } from "react";
import TableComponent from "../reusables/TableComponent";
import Dropdown from "../reusables/ActionComponent";
import { SearchComp } from "../reusables/SearchComp";
import Button from "../reusables/Button";
import Modal from "../reusables/Modal";
import { Inputs } from "../reusables/Input";
import { SuccessBlock } from "../reusables/SuccessBlock";
import { ErrorBlock } from "../reusables/ErrorBlock";
import { DeleteDialogue } from "../reusables/DeleteDialogue";
import { FilesUploads } from "../reusables/FileUpload";

type FormData = {
  end_date: string;
  start_date: string;
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export default function EventPage() {
  const [successBlockStatus, setSuccessBlockStatus] = useState(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | string>(0);
  const [loadingData, setLoadingData] = useState(false);
  const [isOpenUpcoming, setIsOpenUpcoming] = useState(false);
  const [isOpenMemories, setIsOpenMemories] = useState(false);
  const [isUpcoming, setIsUpcoming] = useState("upcoming");
  const [isTabOrCardOpen, setIsTabOrCardOpen] = useState("upcoming");
  const [isEdit, setIsEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState<number | null>(null);
  const [returnDataUpcoming, setReturnDataUpcoming] = useState<FormData[]>([]);
  const [returnDataMemories, setReturnDataMemories] = useState<FormData[]>([]);
  const [fileData, setFiles] = useState<File[]>([]);
  const [_updateCounter, setUpdateCounter] = useState(0);
  const [formEventData, setFormEventData] = useState({
    id: 0,
    title: "",
    description: "",
    image_url: "",
    start_date: "",
    end_date: "",
    created_by: "",
    created_at: "",
    updated_at: ""
  });

  const [formMemData, setFormMemData] = useState({
    id: 0,
    title: "",
    description: "",
    image_url: "",
    event_date: "",
    created_by: "",
    created_at: "",
    updated_at: ""
  });


  const eventHeaders = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "created_by", label: "Created By" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
    { key: "action", label: "Action" }, // for edit/delete buttons
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormEventData({ ...formEventData, [e.target.id]: e.target.value });
  };

  const handleInputChangeMem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormMemData({ ...formMemData, [e.target.id]: e.target.value });
  }

  const handleFileUpdate: React.Dispatch<React.SetStateAction<File[]>> = (files) => {
    if (typeof files === 'function') {
      setFiles(prevFiles => {
        const newFiles = files(prevFiles);
        return newFiles;
      });
    } else {
      setFiles(files);
    }
  };

  const handleMouseClick = (id: number) => {
    setDropDownId(id);
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const emitAction = (userId: string | number, action: string) => {

    if (action === "Delete") {
      setDeleteId(userId);
      setIsDeleteModalOpen(true);
      setIsUpcoming("upcoming");
      console.log(isTabOrCardOpen, userId)

    } else {
      setIsEdit(true);
      setIsUpcoming("upcoming");

      let eventContent = returnDataUpcoming.find((event) => event.id === userId);

      if (eventContent) {
        setFormEventData({
          id: eventContent.id,
          title: eventContent.title,
          description: eventContent.description,
          image_url: eventContent.image_url,
          start_date: eventContent.start_date,
          end_date: eventContent.end_date,
          created_by: eventContent.created_by,
          created_at: eventContent.created_at,
          updated_at: eventContent.updated_at
        });
      }
      setIsOpenUpcoming(true);
    }

  };

  // Custom cell rendering
  const renderCellContent = (headerKey: string, item: any) => {
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
        return item[headerKey as keyof any] ?? "--";
    }
  };


  const handleDelete = async () => {
    setLoadingData(true)
    if (isUpcoming === "upcoming") {
      try {
        const response = await fetch("/api/event/delete-event-upcoming", {
          method: "DELETE",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: deleteId }),
        });

        const data = await response.json();

        if (data.ok) {
          setSuccessBlockStatus(true);
          setBlockMessage(data.message);
          setIsDeleteModalOpen(false);

          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
            handlefetchUpcoming();
          }, 3000);
        }

      } catch (error) {
        setErrorBlockStatus(true);
        setBlockMessage("Error deleting event: " + error);

        setTimeout(() => {
          setErrorBlockStatus(false);
          setBlockMessage("");
        }, 3000);

      } finally {
        setLoadingData(false)
      }
    } else {
      //
    }

  };

  const handledeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    setLoadingData(true)

    if (isUpcoming === "upcoming") {

      try {
        const response = await fetch(isEdit ? "/api/event/update-event-upcoming" : "/api/event/save-event-upcoming", {
          method: isEdit ? "PUT" : "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formEventData),
        });

        const data = await response.json();

        if (data.ok) {
          setSuccessBlockStatus(true);
          setBlockMessage(data.message);
          setIsOpenUpcoming(false);

          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
            onClose();
            handlefetchUpcoming();
          }, 3000);
        }
      }
      catch (error) {
        console.log(error)
        setErrorBlockStatus(true);
        setBlockMessage("Error adding event: " + error);

        setTimeout(() => {
          setErrorBlockStatus(false);
          setBlockMessage("");
        }, 3000);
      } finally {
        setLoadingData(false)
      }

    }

  };

  const handlefetchUpcoming = async () => {
    try {
      const response = await fetch("/api/event/get-event-upcoming", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.ok) {
        setReturnDataUpcoming(data.data);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handlefetchUpcoming();
  }, []);


  //handle submit for event memorires
  const handleSubmitMemories = async () => {
    setLoadingData(true)
    try {
      const data = new FormData();

      fileData.forEach((file) => {
        data.append("file", file)
        data.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET || "");
        data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME || "");
      });

      const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY || "", {
        method: "POST",
        body: data,
      });

      // Await the JSON parsing
      const result = await response.json();

      // Now you can safely access secure_url
      const fileUrl = result.secure_url;

      if (fileUrl) {

        const response = await fetch("/api/event/save-event-memories", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: formMemData.title, description: formMemData.description, image_url: fileUrl }),
        });

        const data = await response.json();

        if (data.ok) {
          setSuccessBlockStatus(true);
          setBlockMessage(data.message);
          setIsOpenMemories(false);

          setTimeout(() => {
            setSuccessBlockStatus(false);
            setBlockMessage("");
            onClose();
            handlefetchMemories();
          }, 3000);
        }

      }

    } catch (error) {

      setErrorBlockStatus(true);
      setBlockMessage("Error adding event: " + error);

      setTimeout(() => {
        setErrorBlockStatus(false);
        setBlockMessage("");
      }, 3000);

    } finally {
      setLoadingData(false)
    }
  }

  //fetch event memmories
  const handlefetchMemories = async () => {
    try {
      const response = await fetch("/api/event/get-event-memories", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data.data)

      if (data.ok) {
        setReturnDataMemories(data.data);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handlefetchMemories()
  }, [])


//handle delete for memmorie event
const handleMemDelete = async()=>{
  setLoadingData(true)
  console.log(deleteId)
  try{
    const response = await fetch("/api/event/delete-event-memories", {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: deleteId }),
    });

    const data = await response.json();

    if (data.ok) {
      setSuccessBlockStatus(true);
      setBlockMessage(data.message);
      setIsDeleteModalOpen(false);

      setTimeout(() => {
        setSuccessBlockStatus(false);
        setBlockMessage("");
        onClose();
        handlefetchMemories();
      }, 3000);
    }
  }catch(error){
    console.log(error)
    setErrorBlockStatus(true);
    setBlockMessage("Error deleting event: " + error);

    setTimeout(() => {
      setErrorBlockStatus(false);
      setBlockMessage("");
    }, 3000);
  }finally{
     setLoadingData(false)
  }
}


  const onClose = () => {
    setIsOpenUpcoming(false);
    setIsOpenMemories(false);
    setFormEventData({
      id: 0,
      title: "",
      description: "",
      image_url: "",
      start_date: "",
      end_date: "",
      created_by: "",
      created_at: "",
      updated_at: ""
    });

    setFormMemData({
      id: 0,
      title: "",
      description: "",
      image_url: "",
      event_date: "",
      created_by: "",
      created_at: "",
      updated_at: ""
    });
    setIsEdit(false);
  };


  return (
    <div className="h-[80vh] px-4 py-4 space-y-5">
      <SuccessBlock blockControl={successBlockStatus} message={blockMessage} />
      <ErrorBlock blockControl={errorBlockStatus} message={blockMessage} />

      <DeleteDialogue
        onDelete={isTabOrCardOpen === "memories" ? handleMemDelete : handleDelete}
        onCancel={handledeleteCancel}
        popup={isDeleteModalOpen}
        text={"Event: " + String(deleteId) + " ?"}
        loading={loadingData}
        disabled={loadingData}
      />

      <Modal
        isOpen={isOpenUpcoming}
        onClose={onClose}
        title={isEdit ? "Edit Upcoming Event" : "Create Upcoming Event"}
        maxWidth="40%"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* upcoming Form */}
          <div className="mt-2">
            <Inputs
              type="text"
              labelOne="Title"
              placeholder="Enter title"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={formEventData.title}
              onChange={handleInputChange}
              id="title"
            />
          </div>
          <div className="mt-2">
            <Inputs
              type="text"
              labelOne="Description"
              placeholder="Enter description"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={formEventData.description}
              onChange={handleInputChange}
              id="description"
            />
          </div>

          <div className="mt-2">
            <Inputs
              type="date"
              labelOne="StartDate"
              placeholder="Enter start date"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={formEventData.start_date}
              onChange={handleInputChange}
              id="start_date"
            />
          </div>

          <div className="mt-2">
            <Inputs
              type="date"
              labelOne="EndDate"
              placeholder="Enter end date"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={formEventData.end_date}
              onChange={handleInputChange}
              id="end_date"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button
              buttonLabel="Cancel"
              className="px-4 py-2 rounded border hover:bg-white/20 mr-2"
              onClick={onClose}
            />
            <Button
              buttonLabel={isEdit ? "Update event" : "Add event"}
              className="border p-2 rounded-md text-white bg-cyan-400"
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
              disabled={formEventData.title === "" || formEventData.description === "" || formEventData.start_date === "" || formEventData.end_date === ""}
              loading={loadingData}
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenMemories}
        onClose={onClose}
        title={'Create Memories'}
        maxWidth="40%"
      >

        <div>
          {/* Memories Form */}
          <div className="mt-2">
            <Inputs
              type="text"
              labelOne="Title"
              placeholder="Enter title"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={formMemData.title}
              onChange={handleInputChangeMem}
              id="title"
            />
          </div>
          <div className="mt-2">
            <Inputs
              type="text"
              labelOne="Description"
              placeholder="Enter description"
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              value={formMemData.description}
              onChange={handleInputChangeMem}
              id="description"
            />
          </div>

          <div className="mt-4">
            <FilesUploads
              style="w-full border px-3 py-2 ring-2 ring-cyan-500 rounded-xl border"
              fileInput="image_url"
              fileData={fileData}
              setUpdateCounter={setUpdateCounter}
              setFiles={handleFileUpdate}
            />
          </div>

          <div className="flex justify-end  mt-6">
            <Button
              buttonLabel="Cancel"
              className="px-4 py-2 rounded border hover:bg-white/20 mr-2"
              onClick={onClose}
            />
            <Button
              buttonLabel={isEdit ? "Update memories" : "Add memories"}
              className="border p-2 rounded-md text-white bg-cyan-400"
              onClick={handleSubmitMemories}
              loading={loadingData}
            />
          </div>
        </div>
      </Modal>

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold">Event Page Management</h1>

      <h3 className="text-lg font-semibold text-gray-700">
        Content Count: <span className="text-cyan-600">{ }</span>
      </h3>


      <div className="flex items-center justify-between">
        <div className="max-w-[300px] w-full">
          <SearchComp
            classStyle="ring-2 ring-cyan-500 p-2 rounded-xl border"
            placeholder="Search users..."
          />

        </div>

        <div className="flex gap-2 ">  {/* Added group class here */}
          <Button
            buttonLabel="Create Upcoming Events"
            className="border p-2 rounded-md text-white bg-cyan-400"
            onClick={() => [setIsOpenUpcoming(true), setIsUpcoming("upcoming")]}
          />

          <Button
            buttonLabel="Create Event Memories"
            className="border p-2 rounded-md text-white bg-cyan-400"
            onClick={() => [setIsOpenMemories(true), setIsUpcoming("memories")]}
          />


        </div>
      </div>

      <hr />

      <div className="relative group">
        <p className="cursor-pointer font-bold underline hover:text-cyan-500">view events</p>
        <div className="absolute left-0 mt-1 w-48 bg-white border-3 border-blue-200 
       rounded-lg shadow-xl opacity-0 group-hover:opacity-100 
       group-hover:visible group-hover:translate-y-2 transform 
       transition-all duration-300 z-50
       before:content-[''] before:absolute before:-top-2 before:left-6
       before:border-l-8 before:border-r-8 before:border-b-8
       before:border-l-transparent before:border-r-transparent before:border-b-white">

          <Button
            buttonLabel="Upcoming Event"
            className="w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                   border-l-4 border-transparent hover:border-blue-500 rounded-md cursor-pointer"
            onClick={() => setIsTabOrCardOpen("upcoming")}
          />

          <Button
            buttonLabel="Event Memories"
            className="w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                   border-l-4 border-transparent hover:border-blue-500 rounded-md cursor-pointer"
            onClick={() => setIsTabOrCardOpen("memories")}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="h-[65vh]">
        {isTabOrCardOpen === 'upcoming'
          ?
          <TableComponent
            headers={eventHeaders}
            classhead="bg-gray-100"
            items={returnDataUpcoming}
            renderCellContent={renderCellContent}
          />
          :
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {returnDataMemories.length === 0
              ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-200 rounded-lg h-64 w-full"
                ></div>
              ))
              : returnDataMemories.map((item) => (
                <div
                  key={item.id}
                  className="
            bg-white 
            rounded-xl 
            shadow-xl 
            p-4 
            transform 
            transition-transform 
            duration-500 
            hover:rotate-y-3 hover:scale-105
            perspective-1000
          "
                >
                  {/* Image */}
                  {item.image_url ? (
                    <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gray-300 rounded-lg mb-3 animate-pulse" />
                  )}

                  {/* Text */}
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
                  <div className="relative">
                    <button
                      onClick={() => handleMouseClick(item.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <img
                        src="/svg/eclipse.svg"
                        alt="More options"
                        className="h-5 w-5 cursor-pointer"
                      />
                    </button>

                    <div className="absolute left-[2px] top-[8px] mt-2 z-20">
                      {dropDownId === item.id && isDropdownOpen && (
                        <Dropdown
                          onMouseLeave={handleMouseLeave}
                          dropdownItems={[
                            { id: item?.id, image: "/svg/delete.svg", label: "Delete", dataCy: "delete" }
                          ]}
                          emitAction={emitAction}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

        }
      </div>
    </div>
  )
}
