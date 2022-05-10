import { useQuery } from "react-query";
import { useParams } from "react-router";
import axiosInstance from "../../helpers/axiosInstance";
import { useEffect, useState } from "react";
import "./NoteDocs.scss";
import NoteDocsTable from "./NoteDocsTable";

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
    <div className="docs-conteiner">
      <div className="docs-conteiner__header">
        <h4>Document name:</h4>
        <h4>Document type</h4>
      </div>
      {data?.attributes &&
        data?.attributes?.files?.data?.map((d) => {
          return (
            <NoteDocsTable
              fileName={d.attributes.name}
              filePath={d.attributes.url}
              fileExtension={d.attributes.ext}
              id={id}
              //   thumbnail={d.attributes.formats.thumbnail.url}
              //d.attributes.formats.thumbnail.url
              thumbnail={
                d.attributes.formats?.thumbnail.url
                  ? d.attributes.formats?.thumbnail.url
                  : ""
              }
            />
          );
        })}
    </div>
  );
};

export default NoteDocs;
