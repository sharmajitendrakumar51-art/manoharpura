import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../assets/css/UserMembers.css";

const UserMembers = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  // =========================
  // GET MEMBERS
  // =========================

  const getMembers = async () => {

    try {

      setLoading(true);

      const res = await api.get("/member/get-members");

      console.log("USER MEMBERS RESPONSE:", res.data);

      if (res.data.success) {

        setMembers(res.data.members || []);

      }

    } catch (error) {

      console.log("GET MEMBERS ERROR:", error);

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // LOAD MEMBERS
  // =========================

  useEffect(() => {

    getMembers();

  }, []);


  // =========================
  // SEARCH
  // =========================

  const filteredMembers = members.filter((member) => {

    const name =
      member.fullName?.toLowerCase() || "";

    const mobile =
      member.mobile?.toString() || "";

    const membership =
      member.membershipType?.toLowerCase() || "";

    const searchValue =
      search.toLowerCase();

    return (
      name.includes(searchValue) ||
      mobile.includes(searchValue) ||
      membership.includes(searchValue)
    );

  });


  return (

    <div className="user-members-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="user-members-header">

        <div>

          <h2>
            Members
          </h2>

          <p>
            View all registered members.
          </p>

        </div>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="user-members-toolbar">

        <div className="user-member-search">

          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>


      {/* =========================
          MEMBERS TABLE
      ========================= */}

      <div className="user-members-table-wrapper">

        <div className="table-responsive">

          <table className="table align-middle user-members-table">

            <thead>

              <tr>

                <th>
                  #
                </th>

                <th>
                  Photo
                </th>

                <th>
                  Name
                </th>

                <th>
                  Mobile
                </th>

                <th>
                  Membership
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="user-members-message"
                  >

                    <div className="loading-members">

                      <div className="spinner-border text-primary"></div>

                      <span>
                        Loading Members...
                      </span>

                    </div>

                  </td>

                </tr>

              ) : filteredMembers.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="user-members-message"
                  >

                    <i className="bi bi-people"></i>

                    <p>
                      No Members Found
                    </p>

                  </td>

                </tr>

              ) : (

                filteredMembers.map(
                  (member, index) => (

                    <tr key={member._id}>

                      {/* Number */}

                      <td className="member-number">

                        {index + 1}

                      </td>


                      {/* Photo */}

                      <td>

                        {member.profilePhoto?.url ? (

                          <img
                            src={member.profilePhoto.url}
                            alt={member.fullName}
                            className="user-member-photo"
                          />

                        ) : (

                          <div className="user-member-photo-placeholder">

                            <i className="bi bi-person-fill"></i>

                          </div>

                        )}

                      </td>


                      {/* Name */}

                      <td>

                        <div className="user-member-name">

                          <strong>
                            {member.fullName}
                          </strong>

                          {member.designation && (

                            <span>
                              {member.designation}
                            </span>

                          )}

                        </div>

                      </td>


                      {/* Mobile */}

                      <td>

                        <div className="user-member-mobile">

                          <i className="bi bi-telephone-fill"></i>

                          {member.mobile}

                        </div>

                      </td>


                      {/* Membership */}

                      <td>

                        <span className="membership-badge">

                          <i className="bi bi-award-fill"></i>

                          {member.membershipType}

                        </span>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          MEMBER COUNT
      ========================= */}

      {!loading && filteredMembers.length > 0 && (

        <div className="user-members-footer">

          Showing{" "}
          <strong>
            {filteredMembers.length}
          </strong>{" "}
          members

        </div>

      )}

    </div>

  );

};

export default UserMembers;