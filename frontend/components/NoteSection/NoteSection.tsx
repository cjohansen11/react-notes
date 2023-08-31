import styles from "./noteSection.module.css";
import { useState } from "react";
import { Button, Note, NoteModal, Search } from "..";
import { useForm, FormProvider } from "react-hook-form";
import { NoteFormSchema, NoteFormType, Note as NoteType, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNote, useListNotes, useDeleteNote } from "@/hooks";

export type NoteSectionProps = {
  user: User;
};

export default function NoteSection({
  user: { email, id: userId },
}: NoteSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  const { isLoading: isLoadingNotes } = useListNotes({
    userId,
    options: {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onSuccess(data) {
        setNotes(data);
      },
    },
  });

  const { mutate: createNote } = useCreateNote({
    options: {
      onSuccess(data) {
        setNotes((prev) => [data, ...prev]);
        setIsModalOpen(false);
      },
    },
  });

  const { mutate: deleteNote } = useDeleteNote({
    options: {
      onSuccess(_data, variables) {
        setNotes((prev) => [
          ...prev.filter(({ id }) => id !== variables.noteId),
        ]);
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

  const handleDeleteNote = async ({ noteId }: { noteId: string }) => {
    await deleteNote({ noteId });
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{`${email.split("@")[0]}'s Notes`}</h1>
        <div className={styles.activityContainer}>
          <Search />
          <Button onClick={handleNewNote}>Create Note</Button>
        </div>
        <div className={styles.notesContainer}>
          {notes.map((note) => (
            <Note {...note} key={note.id} handleDelete={handleDeleteNote} />
          ))}
        </div>
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
