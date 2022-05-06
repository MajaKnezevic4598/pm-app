import { useQuery } from "react-query";
import { useParams } from "react-router";
import axiosInstance from "../../helpers/axiosInstance";
import { useEffect, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

const fetchNoteDocs = async (id) => {
  try {
    const response = await axiosInstance.get(`notes/${id}?populate=files`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

const NoteDocs = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["note-docs", id], () => {
    return fetchNoteDocs(id);
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      {data?.attributes &&
        data?.attributes?.files?.data?.map((d) => {
          return (
            <div>
              <div>{d.attributes.name}</div>
              <div>{d.attributes.url}</div>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                {/* <!-- The viewer component will be put here --> */}
                <Viewer
                  fileUrl={`https://pm-app-bek.herokuapp.com${d.attributes.url}`}
                />
                ...
              </Worker>
            </div>
          );
        })}
    </div>
  );
};

export default NoteDocs;
