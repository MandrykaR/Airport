import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  useCreateUser,
  useDeleteUser,
  useEditUser,
  useGetUsers,
} from '../../../../entities/usersGateways';
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const roles = [
  {
    label: 'Admin',
    value: true,
  },
  {
    label: 'Redactor',
    value: false,
  },
];

export default function EditUsers() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { getUsers } = useGetUsers();
  const { createUser } = useCreateUser();
  const { deleteUser } = useDeleteUser();
  const { editUser } = useEditUser();

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: false,
      };

      const response = await createUser(payload);
      if (response.success) {
        setRows((prev) => [
          ...prev,
          {
            id: response.data.id,
            name: response.data.fullName,
            email: response.data.email,
            password: response.data.password,
            status: roles,
          },
        ]);
      }

      handleCloseDialog();
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error when creating a user', error);
      alert(error.response?.data?.faultString || 'Unknown error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        const users = response.data.users;

        const mappedUsers = users.map((user) => ({
          id: user.id,
          name: user.fullName,
          status: user.isAdmin,
          email: user.email,
        }));

        setRows(mappedUsers);

        return users;
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteUser(id);
      setRows((prev) => prev.filter((user) => user.id !== id));
    } catch {
      alert('Error');
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(newRow);
    console.log(updatedRow);

    try {
      await editUser({
        user_id: updatedRow.id,
        fullName: updatedRow.name,
        email: updatedRow.email,
        isAdmin: updatedRow.status,
      });

      setRows((prev) =>
        prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );

      return updatedRow;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  const handleRowModesModelChange = (newModel) => {
    setRowModesModel(newModel);
  };

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 180,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: roles,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value ? 'Admin' : 'Redactor'}
            color={params.value ? 'primary' : 'default'}
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add User
        </Button>
      </DialogActions>
    </Box>
  );
}
