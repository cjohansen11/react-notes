import styles from "./noteModal.module.css";
import Modal from "react-modal";
import { Input, TextArea, Button } from "..";
import { Controller, useFormContext } from "react-hook-form";
import { NoteFormType } from "@/types";

export type NoteModalProps = {
  isVisible: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  isEditForm?: boolean;
};

export default function NoteModal({
  isVisible,
  handleClose,
  handleSubmit,
  isEditForm,
}: NoteModalProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<NoteFormType>();

  return (
    <Modal
      isOpen={isVisible}
      shouldCloseOnEsc={true}
      onRequestClose={handleClose}
      preventScroll={true}
      className={styles.modal}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
        },
        content: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <div className={styles.container}>
        <p className={styles.title}>Create a new note</p>
        <div>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                placeholder="Title"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                isError={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <TextArea
                placeholder="Note text"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                isError={!!errors.note}
                helperText={errors.note?.message}
              />
            )}
          />
        </div>
        <Button onClick={handleSubmit} color="dark">
          {isEditForm ? "Update" : "Save"}
        </Button>
      </div>
    </Modal>
  );
}
