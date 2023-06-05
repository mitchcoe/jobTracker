import { Modal, Box } from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  minWidth: '300px',
  width: '30vw',
  maxHeight: '85vh',
  minHeight: '300px',
  overflow: 'scroll',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

type TextAreaModalProps = {
  modalOpen: boolean,
  closeFunc: () => void,
  placeholderText: string,
  text: string,
}

export default function TextAreaModal(props: TextAreaModalProps) {
  const { modalOpen, closeFunc, placeholderText, text } = props
  return (
    <Modal
      open={modalOpen}
      onClose={closeFunc}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        encType="multipart/form-data"
        autoComplete="off"
        sx={modalStyles}
      >
        <TextareaAutosize
          minRows={3}
          placeholder={placeholderText}
          style={{color: "black", backgroundColor: 'white', width: '30vw', height: '300px'}}
          defaultValue={text || placeholderText}
          readOnly
        />
      </Box>
    </Modal>
  )
}