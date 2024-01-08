import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Kanban from '../types';

const KanbanList: React.FC = () => {
  const [kanbans, setKanban] = useState<Kanban[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/kanban/');
        setKanban(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h1>Todo List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created_at</TableCell>
              <TableCell>Updated_at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kanbans.map((kanban) => (
              <TableRow
                key={kanban.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{kanban.id}</TableCell>
                <TableCell>{kanban.title}</TableCell>
                <TableCell>{kanban.created_at}</TableCell>
                <TableCell>{kanban.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default KanbanList;
