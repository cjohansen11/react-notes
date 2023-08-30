import styles from "./noteSection.module.css";
import { useState } from "react";
import { Button, NoteModal, Search } from "..";
import { useForm, FormProvider } from "react-hook-form";
import { NoteFormSchema, NoteFormType } from "@/types/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateNote from "@/hooks/useCreateNote";
import { Note } from "@/types/Notes";

export type NoteSectionProps = {
  email: string;
};

export default function NoteSection({ email }: NoteSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const { mutate: createNote } = useCreateNote({
    options: {
      onSuccess(data) {
        setNotes((prev) => [data, ...prev]);
        setIsModalOpen(false);
      },
    },
  });

  const newNoteMethods = useForm<NoteFormType>({
    resolver: zodResolver(NoteFormSchema),
  });
  const { handleSubmit } = newNoteMethods;

  const handleNewNoteSubmit = async ({
    title,
    note,
  }: {
    note: string;
    title?: string;
  }) => {
    await createNote({ note: { note, title }, email });
  };

  const handleNewNote = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{`${email.split("@")[0]}'s Notes`}</h1>
        <div className={styles.activityContainer}>
          <Search />
          <Button onClick={handleNewNote}>Create Note</Button>
        </div>
        {notes.map((note) => (
          <div key={note.id}>
            <div>
              <p>{note.title}</p>
              <p>{note.note}</p>
            </div>
            <div>
              <p>{new Date(note.createDate).toDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      <FormProvider {...newNoteMethods}>
        <NoteModal
          isVisible={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleSubmit={() => handleSubmit(handleNewNoteSubmit)()}
        />
      </FormProvider>
    </>
  );
}
