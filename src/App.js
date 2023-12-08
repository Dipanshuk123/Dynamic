import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';

const validationSchema = Yup.object().shape({});

const MyForm = () => {
  const [formFields, setFormFields] = useState([
    { label: 'Name', type: 'text' },
    { label: 'Email', type: 'text' },
    { label: 'Dropdown Field', type: 'dropdown', options: [] },
  ]);

  const formik = useFormik({
    initialValues: formFields.reduce((acc, field) => {
      acc[field.label.toLowerCase().replace(/ /g, '-')] = '';
      return acc;
    }, {}),
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('formData', JSON.stringify(values));
      formik.resetForm();
    },
  });

  const handleAddField = () => {
    setFormFields([...formFields, { label: '', type: 'text' }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const renderField = (field, index) => {
    const { label, type, options } = field;

    switch (type) {
      case 'text':
      case 'textarea':
        return (
          <TextField
            key={index}
            margin="normal"
            fullWidth
            id={label.toLowerCase().replace(/ /g, '-')}
            label={label}
            name={label.toLowerCase().replace(/ /g, '-')}
            type={type}
            value={formik.values[label.toLowerCase().replace(/ /g, '-')] || ''}
            onChange={formik.handleChange}
            error={formik.touched[label.toLowerCase().replace(/ /g, '-')] && Boolean(formik.errors[label.toLowerCase().replace(/ /g, '-')])}
            helperText={formik.touched[label.toLowerCase().replace(/ /g, '-')] && formik.errors[label.toLowerCase().replace(/ /g, '-')]}
          />
        );
      case 'dropdown':
        return (
          <FormControl key={index} fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
              value={formik.values[label.toLowerCase().replace(/ /g, '-')] || ''}
              onChange={formik.handleChange}
              name={label.toLowerCase().replace(/ /g, '-')}
            >
              {options.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'checkbox':
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={formik.values[label.toLowerCase().replace(/ /g, '-')] || false}
                onChange={formik.handleChange}
                name={label.toLowerCase().replace(/ /g, '-')}
              />
            }
            label={label}
          />
        );
      case 'radio':
        return (
          <FormControl key={index} component="fieldset" margin="normal">
            <RadioGroup
              row
              value={formik.values[label.toLowerCase().replace(/ /g, '-')] || ''}
              onChange={formik.handleChange}
              name={label.toLowerCase().replace(/ /g, '-')}
            >
              {options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            width: '100%',
            mt: 3,
          }}
        >
          {formFields.map((field, index) => (
            <div key={index}>
              <TextField
                margin="normal"
                fullWidth
                id={`type-${index}`}
                label="Field Type"
                name={`type-${index}`}
                select
                value={field.type}
                onChange={(e) => {
                  const updatedFields = [...formFields];
                  updatedFields[index].type = e.target.value;
                  setFormFields(updatedFields);
                }}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="textarea">Text Area</MenuItem>
                <MenuItem value="dropdown">Dropdown</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
                <MenuItem value="radio">Radio Button</MenuItem>
              </TextField>
              {renderField(field, index)}
              <Button type="button" onClick={() => handleRemoveField(index)}>
                Remove Field
              </Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddField}>
            Add Field
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MyForm;
