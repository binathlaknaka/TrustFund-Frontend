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
    reader.readAsDataURL(file);
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
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Edit Post | TrustFund Community</title>
      </Helmet>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-200 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-white p-4 aspect-square flex items-center justify-center mb-4">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
          </div>

          <div className="md:w-2/3 space-y-4">
            <input
              type="text"
              name="programName"
              placeholder="Program Name"
              value={formData.programName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="goal"
              placeholder="Goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="programDescription"
              placeholder="Description"
              value={formData.programDescription}
              onChange={handleChange}
              className="w-full p-2 border rounded h-32"
              required
            />
            <button type="submit" className="bg-[#3276A6] text-white py-2 px-4 rounded">Update Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
