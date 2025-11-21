import React, { useState } from "react";
import { ButtonSpinner } from "@/app/(dashboard)/reusables/Spinner";

interface TableProps {
  headers: { key: string; label: string }[];
  items: Record<string, any>[];
  classhead?: string;
  renderCellContent?: (
    headerKey: string,
    item: Record<string, any>,
  ) => React.ReactNode;
}

const TableComponent: React.FC<TableProps> = ({
  headers,
  classhead,
  items,
  renderCellContent,
}) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const displayedItems = items?.slice(startIndex, endIndex);

  if (items?.length === 0) {
    return (
      <div className="w-full p-2">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {headers?.map((header) => (
                <th
                  key={header.key}
                  className="py-2 px-4 border-b font-bold text-sm text-left text-gray-800"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="w-full text-center p-2 font-bold">Sorry no data to display</div>
        <div className="w-full flex justify-center">
          <ButtonSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <table className="min-w-full border border-gray-300">
        <thead className={classhead ? classhead : `bg-gray-100`}>
          <tr>
            {headers?.map((header) => (
              <th
                key={header.key}
                className="py-2 px-4 border-b font-bold text-sm text-left text-gray-800"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedItems?.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header.key} className="py-2 px-4 border-b">
                  {renderCellContent &&renderCellContent(header.key, item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {items?.length > 9 ? (
        <Pagination
          totalItems={items.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-1 mx-1 border rounded text-gray-700 cursor-pointer hover:bg-cyan-200 hover:text-white"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-3 py-1 mx-1 border rounded bg-gray-200 text-gray-700">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 border rounded text-gray-700 cursor-pointer hover:bg-cyan-200 hover:text-white"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default TableComponent;