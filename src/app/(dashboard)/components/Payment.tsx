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


export default function Payment() {
  const [successBlockStatus, setSuccessBlockStatus] = useState(false);
  const [errorBlockStatus, setErrorBlockStatus] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | string>(0);
  const [loadingData, setLoadingData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState<number | null>(null);
  const [page, setPage] = useState<boolean>(false)

  const certificateHeaders = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "attendee", label: "Attendee" },
    { key: "issuer", label: "Issuer" },
    { key: "event_name", label: "Event Name" },
    { key: "location", label: "Location" },
    { key: "date_range", label: "Date Range" },
    { key: "image_url", label: "Image URL" },
    { key: "image_path", label: "Image Path" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
    { key: "action", label: "Action" }, // for edit/delete buttons
  ];


  const handleMouseClick = (id: number) => {

  };

  const handleMouseLeave = () => {

  };

  const emitAction = (userId: string | number, action: string) => {

    if (action === "Delete") {
      setDeleteId(userId);
      setIsDeleteModalOpen(true);

    } else {

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

  const handleDelete = () => {

  };

  const handledeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };


  return (
    <>
      {page ?
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

            </div>
          </form>
        </Modal>

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-semibold">Gallery Page Management</h1>

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

          <Button
            buttonLabel="Add Payment"
            className="border p-2 rounded-md text-white bg-cyan-400"
            onClick={() => setIsOpen(true)}
          />
        </div>


        {/* TABLE */}
        <div className="h-[65vh]">
          <TableComponent
            headers={certificateHeaders}
            classhead="bg-gray-100"
            items={[]}
            renderCellContent={renderCellContent}
          />
        </div>
      </div>
      :
      <div className="h-[80vh] px-4 py-4 space-y-5">
         <h1 className="text-2xl font-semibold">Page under contruction</h1>
      </div>
      }
    </>
  )
}
