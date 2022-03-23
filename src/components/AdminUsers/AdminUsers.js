import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../helpers/axiosInstance";
import Spinner from "../Spinner.js/Spinner";
import "./AdminUsers.scss";
import UserBox from "./UserBox";

function compare(a, b) {
  if (a.attributes.createdAt > b.attributes.createdAt) {
    return -1;
  }
  if (a.attributes.createdAt < b.attributes.createdAt) {
    return 1;
  }
  return 0;
}

const fetchUsers = async () => {
  const res = await axiosInstance.get("/profiles?populate=*");
  console.log(res.data.data);
  const sortedRes = res?.data.data.sort(compare);
  return sortedRes;
};
//compare na strapiju

const AdminUsers = () => {
  const storageId = localStorage.getItem("userId");
  const profileId = localStorage.getItem("profileId");
  const [searching, setSearching] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  //filterUsers useri koji zadovaljavaju kriterijum pretrage

  const { data, status, refetch } = useQuery(["users"], () => fetchUsers());

  const toggleApprove = async (id, confirmed) => {
    const shouldConfirm = confirmed === true ? true : false;
    if (profileId != id) {
      await axiosInstance.put(`/profiles/${id}`, {
        data: { confirmed: !shouldConfirm },
      });
    }

    if (searching === true) {
      const foundUser = filteredUsers.find((user) => user.id === id);
      foundUser.attributes.confirmed = !shouldConfirm;
    }

    refetch();
  };

  useEffect(() => {
    let newProfiles = [];
    if (nameFilter !== "") {
      data?.map((profile) => {
        if (
          profile.attributes.name
            .toLowerCase()
            .includes(nameFilter.toLowerCase())
        ) {
          newProfiles.push(profile);
        }
      });
      setFilteredUsers(newProfiles);
    } else {
      setFilteredUsers(data ? data : []);
      setSearching(false);
    }
  }, [nameFilter]);

  const searchByName = (e) => {
    if (e.target.value === "") {
      setNameFilter(e.target.value);
      setSearching(false);
      return;
    }
    setNameFilter(e.target.value);
    setSearching(true);
  };

  const deleteProfile = async (id, userId) => {
    if (userId) {
      await axiosInstance.delete("/users/" + userId);
    }
    await axiosInstance.delete("/profiles/" + id);
    if (searching === true) {
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
    }
    refetch();
  };

  if (status === "loading") {
    return <Spinner />;
  }

  const FilteredProfiles = () => {
    return filteredUsers?.map((user) => {
      if (user.id != profileId) {
        return (
          <UserBox
            key={user.id}
            name={user.attributes.name}
            email={user.attributes.email}
            role={user.attributes.role}
            confirmed={user.attributes.confirmed}
            id={user.id}
            toggleApprove={toggleApprove}
            userId={user.attributes?.userId?.data?.id}
            deleteProfile={deleteProfile}
            img={user.attributes?.profilePhoto?.data?.attributes?.url}
          />
        );
      }
    });
  };

  return (
    <div className="users">
      <div className="users__description">
        <div className="users__description__left">
          <div>All Users</div>
          <div>Approve or delete users</div>
        </div>
        <div className="users__description__right">
          <input
            value={nameFilter}
            onChange={searchByName}
            type={"text"}
            placeholder="Search"
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="users__content">
          {
            data && !searching
              ? data?.map((user) => {
                  if (user.id != profileId) {
                    return (
                      <UserBox
                        key={user.id}
                        name={user.attributes.name}
                        email={user.attributes.email}
                        role={user.attributes.role}
                        confirmed={user.attributes.confirmed}
                        id={user.id}
                        toggleApprove={toggleApprove}
                        img={
                          user.attributes?.profilePhoto?.data?.attributes?.url
                        }
                        userId={user.attributes?.userId?.data?.id}
                        deleteProfile={deleteProfile}
                      />
                    );
                  }
                })
              : FilteredProfiles()
            // <FilteredProfiles />
          }
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
