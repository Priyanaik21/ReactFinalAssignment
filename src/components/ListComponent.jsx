import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableComponent from '../components/TableComponent.jsx';
import PaginationComponent from '../components/PaginationComponent.jsx';
import axios from 'axios';

const ListComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [newItem, setNewItem] = useState('');
  const [selectItem, setselectItem] = useState('');
  const [updatedItemTitle, setUpdatedItemTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const managePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const manageAddItem = async () => {
    if (newItem.trim() === '') {
      alert('Please enter a valid item');
      return;
    }
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts',{title: newItem});
    const newData = [...data, { id: data.length + 1, title: newItem }];
    setData(newData);
    setNewItem('');
  };

  const manageDeleteItem = async (id) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };
   
  const manageSelectItem = (item) => {
    setselectItem(item.id);
    setUpdatedItemTitle(item.title);
  };

  const manageUpdateItem = async () => {
    if (!selectItem || updatedItemTitle.trim() === '') {
      alert('Please select an item and enter a valid title');
      return;
    }
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${selectItem}`,{title: updatedItemTitle});
    const newData = data.map(item => {
      if (item.id === parseInt(selectItem)) {
        return { ...item, title: updatedItemTitle };
      }
      return item;
    });
    setData(newData);
    setselectItem('');
    setUpdatedItemTitle('');
  };

  return (
    <Container>
      <h1>List of Data</h1>
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <TableComponent data={currentItems} onDelete={manageDeleteItem} onSelect={manageSelectItem} />
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={managePageChange} />
        </>
      )}
      <Form>
        <Form.Group>
          <Form.Label>Add New Item:</Form.Label>
          <Form.Control type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        </Form.Group>
        <Button variant="outline-success" size="sm" onClick={manageAddItem}>Add</Button>
      </Form>
      <hr />
      <Form>
        <Form.Group>
          <Form.Label>Update Title:</Form.Label>
          <Form.Control type="text" value={updatedItemTitle} onChange={(e) => setUpdatedItemTitle(e.target.value)} />
        </Form.Group>
        <Button variant="outline-success" size="sm" onClick={manageUpdateItem}>Update</Button>
      </Form>
    </Container>
  );
};

export default ListComponent;