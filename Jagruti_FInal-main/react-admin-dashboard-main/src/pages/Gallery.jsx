import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaImages,
  FaCalendarAlt,
} from "react-icons/fa";
import "../assets/css/Gallery.css";
import AdminLayout from "../layouts/AdminLayout";

const categories = [
  "Education",
  "Women Empowerment",
  "Community",
  "Healthcare",
  "Environment",
];
const emptyForm = {
  title: "",
  category: "Education",
  date: "",
  image: "",
};

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  useEffect(() => {
    fetchGallery();
  }, []);


 const fetchGallery = async () => {
  try {
    const res = await axios.get("http://localhost:8000/gallery/get");

    console.log("Gallery API:", res.data);

    setGallery(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const categoryMatch =
        category === "All" || item.category === category;
      const searchMatch = (item.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [gallery, search, category]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };

  const openEdit = (item) => {
    setSelected(item);
    setForm({ ...item });
    setModal("edit");
  };

  const saveImage = async (e) => {
    e.preventDefault();

    if (!form.image || (!(form.image instanceof File) && typeof form.image !== "string")) {
      alert("Please select an image file to upload.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", form.title || "");
      formData.append("category", form.category || "Education");
      formData.append("date", form.date || "");
      formData.append("image", form.image);

      const token = localStorage.getItem("adminToken");
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        "http://localhost:8000/gallery/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...authHeaders,
          },
        }
      );

      if (res.data?.success) {
        alert("Image uploaded successfully!");
        fetchGallery();
        setModal("");
        setForm(emptyForm);
      } else {
        alert("Upload failed: " + (res.data?.message || "Unknown error"));
      }

    } catch (err) {
      console.log(err);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  const deleteImage = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      await axios.delete(
        `http://localhost:8000/gallery/delete/${selected._id}`,
        config
      );

      fetchGallery();

      setSelected(null);

      setModal("");

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AdminLayout>
      <div className="gallery-page">
        <Container fluid>
          {/* HERO BANNER */}
          <div className="custom-hero-banner mb-4">
            <Row className="align-items-center">
              <Col lg={8}>
                <div className="hero-sublabel">ADMINISTRATION / GALLERY</div>
                <h1 className="hero-title">Manage Gallery Photos</h1>
                <p className="hero-desc">
                  Organize, edit, and showcase your foundation's memorable moments and activities from one unified view.
                </p>
              </Col>
              <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
                <Button className="hero-add-btn" onClick={openAdd}>
                  <FaPlus className="me-2" /> Upload New Image
                </Button>
              </Col>
            </Row>
          </div>

          <h2 className="section-title mt-4">All Gallery Photos</h2>
          <p className="stat-label mb-3">View and manage uploaded images.</p>

          {/* FILTERS */}
          <div className="filter-box">
            <Row className="g-2">
              <Col lg={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    className="filter-control"
                    placeholder="Search photos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </div>

          {/* TABLE */}
          <div className="table-wrapper no-scroll-wrapper">
            <Table hover className="custom-gallery-table fit-table mb-0 align-middle">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>Sr.</th>
                  <th style={{ width: "35%" }}>Title</th>
                  <th style={{ width: "20%" }}>Category</th>
                  <th style={{ width: "90px" }}>Image</th>
                  <th style={{ width: "20%" }}>Date</th>
                  <th style={{ width: "120px" }} className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGallery.length ? (
                  filteredGallery.map((item, index) => (
                    <tr key={item._id}>
                      <td className="fw-bold text-muted">{index + 1}</td>
                      <td>
                        <div className="gallery-table-title text-truncate">
                          {item.title}
                        </div>
                      </td>
                      <td>
                        <span className="category-badge-pill">
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <img
                          src={`http://localhost:8000/uploads/${item.image}`}
                          alt={item.title}
                          className="gallery-img-thumb"
                        />
                      </td>
                      <td>
                        <span className="text-nowrap">
                          <FaCalendarAlt className="me-1 text-danger" />
                          {item.date}
                        </span>
                      </td>
                      <td>
                        <div className="actions justify-content-end">
                          <button
                            className="action-btn"
                            title="View"
                            onClick={() => {
                              setSelected(item);
                              setModal("view");
                            }}
                          >
                            <FaEye />
                          </button>

                          <button
                            className="action-btn"
                            title="Edit"
                            onClick={() => openEdit(item)}
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="action-btn delete-btn"
                            title="Delete"
                            onClick={() => {
                              setSelected(item);
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
                    <td colSpan={6} className="text-center py-5">
                      <FaImages style={{ fontSize: 35, color: "var(--muted)" }} />
                      <h6 className="mt-3 text-dark font-weight-bold">
                        No photos found
                      </h6>
                      <p className="stat-label mb-0">
                        Try changing your search or category filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>

      {/* ADD / EDIT MODAL */}
      <Modal
        show={modal === "add" || modal === "edit"}
        onHide={() => setModal("")}
        centered
        size="lg"
      >
        <Form onSubmit={saveImage}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              {modal === "add" ? "Upload New Image" : "Update Image Details"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-3">
              <Col md={8}>
                <Form.Label className="modal-label">Title</Form.Label>
                <Form.Control
                  className="modal-control"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  placeholder="Enter image title"
                  required
                />
              </Col>

              <Col md={4}>
                <Form.Label className="modal-label">Category</Form.Label>
                <Form.Select
                  className="modal-control"
                  name="category"
                  value={form.category}
                  onChange={updateForm}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={12}>
                <Form.Label className="modal-label">Date</Form.Label>
                <Form.Control
                  className="modal-control"
                  name="date"
                  value={form.date}
                  onChange={updateForm}
                  placeholder="12 June 2026"
                />
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">Upload Image File</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="modal-control"
                  onChange={handleImageUpload}
                />
                {form.image && (
                  <div className="mt-2">
                    <img
                      src={
                        typeof form.image === "string"
                          ? `http://localhost:8000/uploads/${form.image}`
                          : URL.createObjectURL(form.image)
                      }
                      alt="Preview"
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={() => setModal("")}>
              Cancel
            </Button>
            <Button variant="danger" className="btn-red-action" type="submit">
              {modal === "add" ? (
                <>
                  <FaPlus className="me-1" /> Save Photo
                </>
              ) : (
                <>
                  <FaEdit className="me-1" /> Save Changes
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        show={modal === "view"}
        onHide={() => setModal("")}
        centered
        size="lg"
      >
        {selected && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selected.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
              <img
                src={selected.image}
                alt={selected.title}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <div className="mt-3 text-start">
                <span className="category-badge-pill">{selected.category}</span>
                <p className="mt-2 mb-0 text-muted small">
                  <FaCalendarAlt className="text-danger me-1" /> {selected.date}
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="light" onClick={() => setModal("")}>
                Close
              </Button>
              <Button
                variant="danger"
                className="btn-red-action"
                onClick={() => openEdit(selected)}
              >
                <FaEdit className="me-1" /> Edit
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* DELETE MODAL */}
      <Modal show={modal === "delete"} onHide={() => setModal("")} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Photo</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center p-4">
          <FaTrash style={{ fontSize: 35, color: "#dc3545" }} />
          <h5 className="mt-3">Delete this photo?</h5>
          <p className="stat-label">
            Are you sure you want to delete <b>{selected?.title}</b>? This action cannot be undone.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setModal("")}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="btn-red-action"
            onClick={deleteImage}
          >
            <FaTrash className="me-1" /> Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
}

export default Gallery;