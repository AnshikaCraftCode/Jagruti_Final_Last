import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
  Table,
  Badge,
} from "react-bootstrap";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaBlog,
  FaCalendarAlt,
} from "react-icons/fa";
import "../assets/css/Blog.css";
import AdminLayout from "../layouts/AdminLayout";

const API_URL = "http://localhost:8000/blogs";

const categories = [
  "Education",
  "Women Empowerment",
  "Healthcare",
  "Environment",
  "Community Development",
];

const emptyBlog = {
  title: "",
  shortDescription: "",
  content: "",
  category: "Education",
  status: "Published",
  image: null,
  imagePreview: "",
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(API_URL);
      const result = await response.json();
      if (response.ok && result.success) {
        setBlogs(result.data || []);
      } else {
        throw new Error(result.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (b.shortDescription || "").toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || (b.category || "") === category;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, category]);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const openAdd = () => {
    setSelected(null);
    setForm(emptyBlog);
    setModal("add");
  };

  const openEdit = (blog) => {
    setSelected(blog);
    setForm({
      title: blog.title || "",
      shortDescription: blog.shortDescription || "",
      content: blog.content || "",
      category: blog.category || "Education",
      status: blog.status || "Published",
      image: null,
      imagePreview: blog.image ? `http://localhost:8000${blog.image}` : "",
    });
    setModal("edit");
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      const token = localStorage.getItem("adminToken");
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      let response;
      if (modal === "add") {
        response = await fetch(`${API_URL}/create`, {
          method: "POST",
          headers: authHeaders,
          body: formData,
        });
      } else {
        response = await fetch(`${API_URL}/${selected._id}`, {
          method: "PUT",
          headers: authHeaders,
          body: formData,
        });
      }

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save blog post");
      }

      await fetchBlogs();
      setModal("");
      setSelected(null);
      setForm(emptyBlog);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async () => {
    if (!selected?._id) return;
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("adminToken");
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_URL}/${selected._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete blog post");
      }
      await fetchBlogs();
      setModal("");
      setSelected(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `http://localhost:8000${image}`;
  };

  return (
    <AdminLayout>
      <div className="blog-page">
        <Container fluid>
          {/* Header */}
          <div className="blog-hero">
            <Row className="align-items-center">
              <Col md={8}>
                <span className="hero-tag">CONTENT MANAGEMENT</span>
                <h1>Manage Blog Posts</h1>
                <p>
                  Create, update, and publish stories of impact and news for Jagruti NGO.
                </p>
              </Col>
              <Col md={4} className="text-md-end mt-3 mt-md-0">
                <Button className="btn-add-blog" onClick={openAdd}>
                  <FaPlus className="me-2" /> Add New Blog
                </Button>
              </Col>
            </Row>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {/* Filters */}
          <div className="blog-filters-card my-4">
            <Row className="g-3">
              <Col md={6} lg={8}>
                <InputGroup className="blog-search-box">
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by title or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6} lg={4}>
                <InputGroup className="blog-filter-box">
                  <InputGroup.Text>
                    <FaFilter />
                  </InputGroup.Text>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </div>

          {/* Blog Table */}
          <div className="blog-table-card shadow-sm">
            <div className="table-responsive">
              <Table hover align="middle" className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Article</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        No blog posts found.
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((b) => (
                      <tr key={b._id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={getImageUrl(b.image) || "https://via.placeholder.com/80x50"}
                              alt={b.title}
                              style={{
                                width: "70px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                            <div>
                              <h6 className="mb-1 text-dark fw-bold">{b.title}</h6>
                              <small className="text-muted text-truncate d-block" style={{ maxWidth: "300px" }}>
                                {b.shortDescription}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge bg="info" className="text-dark px-2 py-1">
                            {b.category || "General"}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            bg={b.status === "Published" ? "success" : "secondary"}
                          >
                            {b.status || "Published"}
                          </Badge>
                        </td>
                        <td className="small text-muted">
                          <FaCalendarAlt className="me-1" />
                          {b.createdAt
                            ? new Date(b.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="text-end">
                          <Button
                            variant="light"
                            size="sm"
                            className="me-1 text-primary border"
                            onClick={() => {
                              setSelected(b);
                              setModal("view");
                            }}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="me-1 text-success border"
                            onClick={() => openEdit(b)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="text-danger border"
                            onClick={() => {
                              setSelected(b);
                              setModal("delete");
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>

        {/* Add / Edit Modal */}
        <Modal
          show={modal === "add" || modal === "edit"}
          onHide={() => setModal("")}
          size="lg"
          centered
        >
          <Form onSubmit={saveBlog}>
            <Modal.Header closeButton>
              <Modal.Title>
                {modal === "add" ? "Create New Blog Post" : "Edit Blog Post"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={form.title}
                      onChange={updateForm}
                      required
                      placeholder="Blog Post Title"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Category</Form.Label>
                    <Form.Select
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
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={form.status}
                      onChange={updateForm}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Short Summary</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="shortDescription"
                      value={form.shortDescription}
                      onChange={updateForm}
                      placeholder="Brief excerpt displayed on blog list..."
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="content"
                      value={form.content}
                      onChange={updateForm}
                      required
                      placeholder="Write main article story details..."
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Featured Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {form.imagePreview && (
                      <div className="mt-2">
                        <img
                          src={form.imagePreview}
                          alt="Preview"
                          style={{
                            height: "120px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModal("")}>
                Cancel
              </Button>
              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? "Saving..." : "Save Blog Post"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* View Modal */}
        <Modal show={modal === "view"} onHide={() => setModal("")} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selected?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selected && (
              <div>
                {selected.image && (
                  <img
                    src={getImageUrl(selected.image)}
                    alt={selected.title}
                    className="img-fluid rounded mb-3 w-100"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                )}
                <Badge bg="info" className="mb-2 text-dark">
                  {selected.category}
                </Badge>
                <p className="lead text-muted">{selected.shortDescription}</p>
                <hr />
                <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>{selected.content}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={modal === "delete"} onHide={() => setModal("")} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Blog Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <strong>{selected?.title}</strong>? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModal("")}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteBlog} disabled={loading}>
              {loading ? "Deleting..." : "Delete Blog"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Blog;