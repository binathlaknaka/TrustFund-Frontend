import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    programName: '',
    goal: '',
    programDescription: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await res.json();
        setFormData({
          programName: data.programName,
          goal: data.goal,
          programDescription: data.programDescription,
          image: null
        });
        setPreviewUrl(`http://localhost:5000/uploads/${data.image}`);
      } catch (err) {
        console.error('Error loading post:', err);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('programName', formData.programName);
    data.append('goal', formData.goal);
    data.append('programDescription', formData.programDescription);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        body: data
      });

      if (res.ok) {
        navigate('/org/post');
      } else {
        console.error('Update failed');
      }
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <Helmet>
        <title>Edit Post | TrustFund Community</title>
      </Helmet>

      <div className="flex justify-center items-center my-6 mb-16">
        <h1 className="text-3xl font-bold text-black text-center">
          Edit Post | TrustFund Community
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image preview & upload */}
          <div className="md:w-1/3">
            <div className="bg-white p-4 aspect-square flex items-center justify-center mb-4 border border-gray-300 rounded">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            <label className="block text-black font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
            />
          </div>

          {/* Form Fields */}
          <div className="md:w-2/3 space-y-4">
            <div>
              <label className="block mb-1 font-medium">Program Name</label>
              <input
                type="text"
                name="programName"
                placeholder="Program Name"
                value={formData.programName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Goal (Rs.)</label>
              <input
                type="number"
                name="goal"
                placeholder="Enter fundraising goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Program Description</label>
              <textarea
                name="programDescription"
                placeholder="Describe the program"
                value={formData.programDescription}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded h-32 text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#3276A6] hover:bg-[#3276A6]/90 text-white py-2 px-4 rounded transition"
            >
              Update Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
