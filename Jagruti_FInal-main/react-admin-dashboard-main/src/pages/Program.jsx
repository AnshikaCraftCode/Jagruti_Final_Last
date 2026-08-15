import React, { useEffect, useMemo, useState } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
  Table
} from "react-bootstrap";

import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaLayerGroup,
  FaCalendarAlt
} from "react-icons/fa";

import "../assets/css/Program.css";
import AdminLayout from "../layouts/AdminLayout";


// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:8000/programs";


// =====================================================
// ICON TYPES
// =====================================================

const iconTypes = [
  {
    value: "education",
    label: "Education"
  },
  {
    value: "women",
    label: "Women Empowerment"
  },
  {
    value: "health",
    label: "Health Initiatives"
  },
  {
    value: "environment",
    label: "Environmental Projects"
  },
  {
    value: "animal",
    label: "Animal Welfare"
  },
  {
    value: "food",
    label: "Food Distribution"
  },
  {
    value: "disaster",
    label: "Disaster Relief"
  },
  {
    value: "skill",
    label: "Skill Development"
  },
  {
    value: "elderly",
    label: "Elderly Care"
  }
];


// =====================================================
// EMPTY FORM
// =====================================================

const emptyForm = {
  title: "",
  description: "",
  iconType: "education",
  image: null,
  imagePreview: "",
  points: ["", "", "", ""]
};


// =====================================================
// COMPONENT
// =====================================================

const Programs = () => {

  const [programs, setPrograms] = useState([]);

  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [modal, setModal] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ===================================================
  // GET ALL PROGRAMS
  // ===================================================

  const fetchPrograms = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await fetch(API_URL);

      const result = await response.json();

      if (!response.ok) {

        throw new Error(
          result.message || "Failed to fetch programs"
        );

      }

      setPrograms(result.data || []);

    } catch (error) {

      console.error("Fetch programs error:", error);

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // LOAD PROGRAMS WHEN PAGE OPENS
  // ===================================================

  useEffect(() => {

    fetchPrograms();

  }, []);


  // ===================================================
  // CATEGORY / ICON LABEL
  // ===================================================

  const getCategoryLabel = (iconType) => {

    const found = iconTypes.find(
      item => item.value === iconType
    );

    return found ? found.label : iconType;

  };


  // ===================================================
  // FILTER PROGRAMS
  // ===================================================

  const filteredPrograms = useMemo(() => {

    return programs.filter((p) => {

      const matchesSearch =
        p.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        getCategoryLabel(p.iconType) === category;

      return matchesSearch && matchesCategory;

    });

  }, [programs, search, category]);


  // ===================================================
  // UPDATE FORM
  // ===================================================

  const updateForm = (e) => {

    const {
      name,
      value
    } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

  };


  // ===================================================
  // UPDATE POINT
  // ===================================================

  const updatePoint = (index, value) => {

    setForm(prev => {

      const updatedPoints = [...prev.points];

      updatedPoints[index] = value;

      return {
        ...prev,
        points: updatedPoints
      };

    });

  };


  // ===================================================
  // IMAGE UPLOAD
  // ===================================================

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setForm(prev => ({
      ...prev,
      image: file,
      imagePreview: previewUrl
    }));

  };


  // ===================================================
  // OPEN ADD MODAL
  // ===================================================

  const openAdd = () => {

    setSelected(null);

    setForm({
      ...emptyForm,
      points: ["", "", "", ""]
    });

    setModal("add");

  };


  // ===================================================
  // OPEN EDIT MODAL
  // ===================================================

  const openEdit = (program) => {

    setSelected(program);

    const existingPoints =
      program.points || [];

    const points = [
      existingPoints[0] || "",
      existingPoints[1] || "",
      existingPoints[2] || "",
      existingPoints[3] || ""
    ];

    setForm({

      title: program.title || "",

      description:
        program.description || "",

      iconType:
        program.iconType || "education",

      image: null,

      imagePreview: program.image
        ? `http://localhost:8000${program.image}`
        : "",

      points

    });

    setModal("edit");

  };


  // ===================================================
  // CREATE / UPDATE PROGRAM
  // ===================================================

  const saveProgram = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");


      // -----------------------------------------------
      // Remove empty bullet points
      // -----------------------------------------------

      const cleanedPoints =
        form.points
          .map(point => point.trim())
          .filter(point => point !== "");


      // -----------------------------------------------
      // FormData
      // -----------------------------------------------

      const formData = new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "iconType",
        form.iconType
      );

      formData.append(
        "points",
        JSON.stringify(cleanedPoints)
      );


      // Only append image if a new image
      // has been selected

      if (form.image) {

        formData.append(
          "image",
          form.image
        );

      }


      // -----------------------------------------------
      // ADD
      // -----------------------------------------------

      const token = localStorage.getItem("adminToken");
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      if (modal === "add") {

        const response = await fetch(
          `${API_URL}/create`,
          {
            method: "POST",
            headers: authHeaders,
            body: formData
          }
        );

        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
            "Failed to create program"
          );

        }

      }


      // -----------------------------------------------
      // UPDATE
      // -----------------------------------------------

      else {

        const response = await fetch(
          `${API_URL}/${selected._id}`,
          {
            method: "PUT",
            headers: authHeaders,
            body: formData
          }
        );

        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
            "Failed to update program"
          );

        }

      }


      // -----------------------------------------------
      // Refresh table
      // -----------------------------------------------

      await fetchPrograms();


      // -----------------------------------------------
      // Close modal
      // -----------------------------------------------

      setModal("");

      setSelected(null);

      setForm({
        ...emptyForm,
        points: ["", "", "", ""]
      });


    } catch (error) {

      console.error(
        "Save program error:",
        error
      );

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // DELETE PROGRAM
  // ===================================================

  const deleteProgram = async () => {

    if (!selected?._id) {
      return;
    }

    try {

      setLoading(true);

      setError("");

      const token = localStorage.getItem("adminToken");
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(
        `${API_URL}/${selected._id}`,
        {
          method: "DELETE",
          headers: authHeaders
        }
      );


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
          "Failed to delete program"
        );

      }


      await fetchPrograms();


      setModal("");

      setSelected(null);


    } catch (error) {

      console.error(
        "Delete program error:",
        error
      );

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // IMAGE URL
  // ===================================================

  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:8000${image}`;

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <AdminLayout>

      <div className="programs-page">

        <Container fluid>

          {/* =========================================
              HEADER
          ========================================= */}

          <div className="programs-hero">

            <Row className="align-items-center">

              <Col lg={8}>

                <div className="hero-label">
                  ADMINISTRATION / PROGRAMS
                </div>

                <h1>
                  Manage Foundation Programs
                </h1>

                <p>
                  Organize, edit, and monitor all your
                  social programs from one unified table view.
                </p>

              </Col>


              <Col
                lg={4}
                className="text-lg-end"
              >

                <Button
                  variant="danger"
                  className="btn-red-action"
                  onClick={openAdd}
                >

                  <FaPlus className="me-2" />

                  Add New Program

                </Button>

              </Col>

            </Row>

          </div>


          {/* =========================================
              ERROR
          ========================================= */}

          {error && (

            <div className="alert alert-danger mt-3">

              {error}

            </div>

          )}


          {/* =========================================
              TITLE
          ========================================= */}

          <h2 className="section-title mt-4">
            All Programs
          </h2>

          <p className="stat-label mb-3">
            View and manage all programs.
          </p>


          {/* =========================================
              FILTERS
          ========================================= */}

          <div className="filter-box">

            <Row className="g-2">

              <Col lg={6}>

                <InputGroup>

                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>

                  <Form.Control
                    className="filter-control"
                    placeholder="Search programs..."
                    value={search}
                    onChange={e =>
                      setSearch(e.target.value)
                    }
                  />

                </InputGroup>

              </Col>


              <Col lg={6}>

                <InputGroup>

                  <InputGroup.Text>
                    <FaFilter />
                  </InputGroup.Text>

                  <Form.Select
                    className="filter-control"
                    value={category}
                    onChange={e =>
                      setCategory(e.target.value)
                    }
                  >

                    <option value="All">
                      All Categories
                    </option>

                    {iconTypes.map(item => (

                      <option
                        key={item.value}
                        value={item.label}
                      >
                        {item.label}
                      </option>

                    ))}

                  </Form.Select>

                </InputGroup>

              </Col>

            </Row>

          </div>


          {/* =========================================
              TABLE
          ========================================= */}

          <div className="table-wrapper no-scroll-wrapper">

            <Table
              hover
              className="custom-program-table fit-table mb-0 align-middle"
            >

              <thead>

                <tr>

                  <th style={{ width: "50px" }}>
                    Sr.
                  </th>

                  <th style={{ width: "35%" }}>
                    Program Details
                  </th>

                  <th style={{ width: "18%" }}>
                    Category
                  </th>

                  <th style={{ width: "80px" }}>
                    Image
                  </th>

                  <th
                    style={{ width: "120px" }}
                    className="text-end"
                  >
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {loading && programs.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="text-center py-5"
                    >
                      Loading programs...
                    </td>

                  </tr>

                ) : filteredPrograms.length ? (

                  filteredPrograms.map((p, index) => (

                    <tr key={p._id}>

                      <td className="fw-bold text-muted">
                        {index + 1}
                      </td>


                      <td>

                        <div className="text-truncate-container">

                          <div className="program-table-title text-truncate">

                            {p.title}

                          </div>

                          <div className="program-table-desc text-truncate">

                            {p.description}

                          </div>

                        </div>

                      </td>


                      <td>

                        <span className="category-badge-pill">

                          {getCategoryLabel(
                            p.iconType
                          )}

                        </span>

                      </td>


                      <td>

                        <img
                          src={getImageUrl(p.image)}
                          alt={p.title}
                          className="program-img-thumb"
                        />

                      </td>


                      <td>

                        <div className="actions justify-content-end">

                          {/* VIEW */}

                          <button
                            className="action-btn"
                            title="View"
                            onClick={() => {

                              setSelected(p);

                              setModal("view");

                            }}
                          >

                            <FaEye />

                          </button>


                          {/* EDIT */}

                          <button
                            className="action-btn"
                            title="Edit"
                            onClick={() =>
                              openEdit(p)
                            }
                          >

                            <FaEdit />

                          </button>


                          {/* DELETE */}

                          <button
                            className="action-btn delete-btn"
                            title="Delete"
                            onClick={() => {

                              setSelected(p);

                              setModal("delete");

                            }}
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="text-center py-5"
                    >

                      <FaLayerGroup
                        style={{
                          fontSize: 35,
                          color: "var(--muted)"
                        }}
                      />

                      <h6 className="mt-3 text-dark font-weight-bold">
                        No programs found
                      </h6>

                      <p className="stat-label mb-0">
                        Try changing your search or filters.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </Table>

          </div>

        </Container>

      </div>


      {/* =================================================
          ADD / UPDATE MODAL
      ================================================= */}

      <Modal
        show={
          modal === "add" ||
          modal === "edit"
        }
        onHide={() => setModal("")}
        centered
        size="lg"
      >

        <Form onSubmit={saveProgram}>

          <Modal.Header closeButton>

            <Modal.Title className="modal-title">

              {modal === "add"
                ? "Add New Program"
                : "Update Program"}

            </Modal.Title>

          </Modal.Header>


          <Modal.Body>

            <Row className="g-3">

              {/* PROGRAM NAME */}

              <Col md={8}>

                <Form.Label className="modal-label">
                  Program Name
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  placeholder="Enter program name"
                  required
                />

              </Col>


              {/* ICON TYPE */}

              <Col md={4}>

                <Form.Label className="modal-label">
                  Program Type
                </Form.Label>

                <Form.Select
                  className="modal-control"
                  name="iconType"
                  value={form.iconType}
                  onChange={updateForm}
                  required
                >

                  {iconTypes.map(item => (

                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>

                  ))}

                </Form.Select>

              </Col>


              {/* IMAGE */}

              <Col xs={12}>

                <Form.Label className="modal-label">
                  Upload Program Image
                </Form.Label>

                <Form.Control
                  type="file"
                  accept="image/*"
                  className="modal-control"
                  onChange={handleImageUpload}
                  required={modal === "add"}
                />


                {form.imagePreview && (

                  <div className="mt-2">

                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px"
                      }}
                    />

                  </div>

                )}

              </Col>


              {/* DESCRIPTION */}

              <Col xs={12}>

                <Form.Label className="modal-label">
                  Description
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={3}
                  className="modal-control"
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  placeholder="Enter detailed description"
                  required
                />

              </Col>


              {/* POINT 1 */}

              <Col md={6}>

                <Form.Label className="modal-label">
                  Highlight 1
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  value={form.points[0]}
                  onChange={e =>
                    updatePoint(
                      0,
                      e.target.value
                    )
                  }
                  placeholder="Enter first highlight"
                />

              </Col>


              {/* POINT 2 */}

              <Col md={6}>

                <Form.Label className="modal-label">
                  Highlight 2
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  value={form.points[1]}
                  onChange={e =>
                    updatePoint(
                      1,
                      e.target.value
                    )
                  }
                  placeholder="Enter second highlight"
                />

              </Col>


              {/* POINT 3 */}

              <Col md={6}>

                <Form.Label className="modal-label">
                  Highlight 3
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  value={form.points[2]}
                  onChange={e =>
                    updatePoint(
                      2,
                      e.target.value
                    )
                  }
                  placeholder="Enter third highlight"
                />

              </Col>


              {/* POINT 4 */}

              <Col md={6}>

                <Form.Label className="modal-label">
                  Highlight 4
                </Form.Label>

                <Form.Control
                  className="modal-control"
                  value={form.points[3]}
                  onChange={e =>
                    updatePoint(
                      3,
                      e.target.value
                    )
                  }
                  placeholder="Enter fourth highlight"
                />

              </Col>

            </Row>

          </Modal.Body>


          <Modal.Footer>

            <Button
              variant="light"
              onClick={() => setModal("")}
            >
              Cancel
            </Button>


            <Button
              variant="danger"
              className="btn-red-action"
              type="submit"
              disabled={loading}
            >

              {modal === "add" ? (

                <>
                  <FaPlus className="me-1" />
                  Add Program
                </>

              ) : (

                <>
                  <FaEdit className="me-1" />
                  Save Changes
                </>

              )}

            </Button>

          </Modal.Footer>

        </Form>

      </Modal>


      {/* =================================================
          VIEW MODAL
      ================================================= */}

      <Modal
        show={modal === "view"}
        onHide={() => setModal("")}
        centered
        size="lg"
      >

        {selected && (

          <>

            <Modal.Header closeButton>

              <Modal.Title>
                Program Details
              </Modal.Title>

            </Modal.Header>


            <Modal.Body>

              <Row className="g-4">

                <Col md={5}>

                  <img
                    src={getImageUrl(
                      selected.image
                    )}
                    alt={selected.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }}
                  />

                </Col>


                <Col md={7}>

                  <h3 className="mt-2 text-dark font-weight-bold">

                    {selected.title}

                  </h3>


                  <p className="text-muted small">

                    {selected.description}

                  </p>


                  <div className="border-top pt-3 mt-3">

                    <p className="mb-2 text-muted small">

                      <strong>
                        Program Type:
                      </strong>{" "}

                      {getCategoryLabel(
                        selected.iconType
                      )}

                    </p>


                    <p className="mb-2 text-muted small">

                      <strong>
                        Highlights:
                      </strong>

                    </p>


                    <ul>

                      {(selected.points || []).map(
                        (point, index) => (

                          <li key={index}>
                            {point}
                          </li>

                        )
                      )}

                    </ul>

                  </div>

                </Col>

              </Row>

            </Modal.Body>


            <Modal.Footer>

              <Button
                variant="light"
                onClick={() => setModal("")}
              >
                Close
              </Button>


              <Button
                variant="danger"
                className="btn-red-action"
                onClick={() =>
                  openEdit(selected)
                }
              >

                <FaEdit className="me-1" />

                Update

              </Button>

            </Modal.Footer>

          </>

        )}

      </Modal>


      {/* =================================================
          DELETE MODAL
      ================================================= */}

      <Modal
        show={modal === "delete"}
        onHide={() => setModal("")}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Delete Program
          </Modal.Title>

        </Modal.Header>


        <Modal.Body className="text-center p-4">

          <FaTrash
            style={{
              fontSize: 35,
              color: "#dc3545"
            }}
          />

          <h5 className="mt-3">
            Delete this program?
          </h5>

          <p className="stat-label">

            Are you sure you want to delete{" "}

            <b>
              {selected?.title}
            </b>

            ? This action cannot be undone.

          </p>

        </Modal.Body>


        <Modal.Footer>

          <Button
            variant="light"
            onClick={() => setModal("")}
          >
            Cancel
          </Button>


          <Button
            variant="danger"
            className="btn-red-action"
            onClick={deleteProgram}
            disabled={loading}
          >

            <FaTrash className="me-1" />

            Delete

          </Button>

        </Modal.Footer>

      </Modal>

    </AdminLayout>

  );

};


export default Programs;