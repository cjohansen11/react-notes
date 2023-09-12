import styles from "./noteModal.module.css";
import Modal from "react-modal";
import { Input, TextArea, Button } from "..";
import { Controller, useFormContext } from "react-hook-form";
import { NoteFormType } from "@/types";
import { motion } from "framer-motion";

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
      <motion.div
        className={styles.container}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.25 }}
      >
        <p className={styles.title}>
          {isEditForm ? `Update your note` : `Create a new note`}
        </p>
        <div className={styles.inputContainer}>
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
        <Button onClick={handleSubmit}>{isEditForm ? "Update" : "Save"}</Button>
      </motion.div>
    </Modal>
  );
}
