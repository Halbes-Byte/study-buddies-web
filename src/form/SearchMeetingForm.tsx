import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid2
} from '@mui/material';
import CloseIconPath from '../data/close_icon_red.png';
import { getModules } from '../api/ModuleApi';
import { getMeetingsForModule } from '../api/MeetingApi';
import axiosInstance from '../AxiosConfig';
import { ModuleDto } from '../dtos/ModuleDto';
import { MeetingDto } from '../dtos/MeetingDto';
import GroupedMeeting from '../components/meeting/GroupedMeeting';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchMeetingForm({ open, onClose }: Props) {
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [meetings, setMeetings] = useState<MeetingDto[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('');

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await getModules(axiosInstance);
        setModules(res);
      } catch (e) {
        console.error(e);
      }
    }
    fetchModules();
  }, []);

  useEffect(() => {
    async function fetchMeetings() {
      if (!selectedModule) return;
      try {
        const res = await getMeetingsForModule(axiosInstance, selectedModule);
        setMeetings(res);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMeetings();
  }, [selectedModule]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedModule(event.target.value as string);
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{
      '& .MuiDialog-container': {
        '& .MuiPaper-root': {
          width: '70%',
          maxWidth: '90%',
          minWidth: '350px',
          bgcolor: '#1C212C',
          padding: '8px',
          height: '80%'
        }
      }
    }}>
      <DialogTitle sx={{ color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="font-bold text-2xl">Lernsession finden</span>
        <IconButton aria-label="close" onClick={onClose} size="large" sx={{ color: '#FFFFFF' }}>
          <img src={CloseIconPath} alt="close" style={{ width: 16, height: 16 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form className="overflow-y-visible">
          <Select
            variant="outlined"
            value={selectedModule}
            onChange={handleSelectChange}
            sx={{ width: '50%', minWidth: 240, color: '#ffffff', bgcolor: '#333C4F', borderColor: '#333C4F' }}
          >
            {modules.map((m, i) => (
              <MenuItem key={i} value={m.name}>
                {m.name}
              </MenuItem>
            ))}
          </Select>
          <Grid2 container spacing={3} className="my-5 overflow-y-scroll">
            <GroupedMeeting meetings={meetings} />
          </Grid2>
        </form>
      </DialogContent>
    </Dialog>
  );
}
