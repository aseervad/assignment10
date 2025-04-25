import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const ListeningTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(null);

  const API_URL = 'http://localhost:5000/api/listening-tests';

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTests(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load tests. Please try again.');
      console.error('Error fetching tests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !file) {
      setError('Please provide both a question and an audio file');
      return;
    }

    try {
      setUploading(true);
      setError('');
      const formData = new FormData();
      formData.append('question', question);
      formData.append('file', file);
      formData.append('user_id', 1); // In a real app, get from auth context

      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Add the new test to the list
      setTests([response.data.data, ...tests]);
      setQuestion('');
      setFile(null);
      document.getElementById('audio-upload').value = '';
    } catch (err) {
      setError('Failed to upload test. Please try again.');
      console.error('Error uploading test:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (testId) => {
    try {
      await axios.delete(`${API_URL}/${testId}`);
      setTests(tests.filter(test => test.id !== testId));
    } catch (err) {
      setError('Failed to delete test');
      console.error('Error deleting test:', err);
    }
  };

  const toggleAudio = (testId) => {
    setAudioPlaying(audioPlaying === testId ? null : testId);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Listening Tests</Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add New Test</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Question" variant="outlined" value={question}
            onChange={(e) => setQuestion(e.target.value)} margin="normal" required
          />
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Audio File (MP3, WAV, OGG)</Typography>
            <input id="audio-upload" type="file" accept=".mp3,.wav,.ogg" onChange={handleFileChange} required />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Maximum file size: 16MB. Supported formats: MP3, WAV, OGG
            </Typography>
          </Box>
          <Button type="submit" variant="contained" color="primary" disabled={uploading} sx={{ mt: 2 }}>
            {uploading ? 'Uploading...' : 'Submit'}
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>Test Records</Typography>
      {loading ? (
        <LinearProgress />
      ) : tests.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography>No tests available. Add your first test above.</Typography>
        </Paper>
      ) : (
        <List>
          {tests.map((test) => (
            <React.Fragment key={test.id}>
              <ListItem>
                <ListItemText
                  primary={test.question}
                  secondary={`Created: ${test.created_at ? new Date(test.created_at).toLocaleString() : "Unknown"}`}
                />
                <IconButton onClick={() => toggleAudio(test.id)}>
                  <PlayArrowIcon color={audioPlaying === test.id ? 'primary' : 'inherit'} />
                </IconButton>
                <IconButton onClick={() => handleDelete(test.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
              {audioPlaying === test.id && (
                <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                  <audio controls src={`http://localhost:5000/api/listening-tests/audio/${test.audio_file}`} />
                </Box>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ListeningTests;