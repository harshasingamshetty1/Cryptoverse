import React from "react";

function TableComp() {
  return (
    <div className=" border rounded mt-9 flex flex-col ">
      <table className="w-full table-auto capitalize ">
        <thead
          className="capitalize text-base text-gray-100 
            font-medium border-b border-gray-100"
        >
          <tr>
            <th className="py-1 ">asset</th>
            <th className="py-1 ">name</th>
            <th className="py-1 ">price</th>
            <th className="py-1 ">total volume</th>
            <th className="py-1 ">market cap change</th>
            <th className="py-1 ">1h</th>
            <th className="py-1 ">24h</th>
            <th className="py-1 ">7d</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>asset</td>
            <td>name</td>
            <td>price</td>
            <td>total volume</td>
            <td>market cap change</td>
            <td>1h</td>
            <td>24h</td>
            <td>7d</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableComp;
