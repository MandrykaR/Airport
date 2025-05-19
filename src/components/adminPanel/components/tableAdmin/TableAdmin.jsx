import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
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
  useGetPosts,
  useDeletePost,
  useUpdatePost,
} from '../../../../entities/postsGateways';
import { Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

import './tablePanel.scss';

function EditToolbar({ setRows, setRowModesModel }) {
  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', status: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return handleClick;
}

const TablePostsAdmin = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const { getPosts } = useGetPosts();
  const { deletePosts } = useDeletePost();
  const { updatePost } = useUpdatePost();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ page: 1, limit: 10 });
        const posts = data.data.posts;

        const formattedRows = posts.map((post) => ({
          id: post.id,
          name: post.title,
          postDate: new Date(post.createdAt),
          status: post.status || 'Published',
        }));

        setRows(formattedRows);
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  const processRowUpdate = async (newRow) => {
    const updateData = {
      title: newRow.name,
      postDate: newRow.postDate,
      status: newRow.status,
    };

    try {
      const updatedPost = await updatePost(newRow.id, updateData);
      return { ...newRow, ...updatedPost.data };
    } catch (error) {
      console.error(error);
      return newRow;
    }
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
    try {
      await deletePosts(id);
      setRows((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newModel) => {
    setRowModesModel(newModel);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'postDate',
      headerName: 'Post Date',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: true,
      valueOptions: 'Published',
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
      <div className="box-name-posts">
        <ListAltIcon fontSize="large" color="action" />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          List Posts
        </Typography>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
};

export default TablePostsAdmin;
