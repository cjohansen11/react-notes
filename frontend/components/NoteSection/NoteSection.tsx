import styles from "./noteSection.module.css";
import { useState } from "react";
import { ActivityIndicator, Button, Note, NoteModal, Search } from "..";
import { useForm, FormProvider } from "react-hook-form";
import {
  NoteFormSchema,
  NoteFormType,
  Note as NoteType,
  SearchFormType,
  User,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateNote,
  useListNotes,
  useDeleteNote,
  useDebouncedValue,
  useUpdateNote,
} from "@/hooks";

export type NoteSectionProps = {
  user: User;
};

export default function NoteSection({
  user: { email, id: userId },
}: NoteSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isEditForm, setIsEditForm] = useState(false);
  const [updateNoteId, setUpdateNoteId] = useState<string | undefined>(
    undefined
  );

  const newNoteMethods = useForm<NoteFormType>({
    resolver: zodResolver(NoteFormSchema),
    defaultValues: {
      note: "",
      title: "",
    },
  });
  const { handleSubmit, setValue } = newNoteMethods;

  const searchMethods = useForm<SearchFormType>({
    defaultValues: {
      orderBy: "Newest",
    },
  });
  const { watch } = searchMethods;

  const getOrderBy = (orderBy?: string) => {
    switch (orderBy) {
      case "Oldest":
        return "oldest";
      case "Recently Updated":
        return "recentlyUpdated";
      case "Newest":
        return "newest";
      default:
        return undefined;
    }
  };

  const { isLoading: isLoadingNotes } = useListNotes({
    userId,
    query: useDebouncedValue(watch("query"), 500),
    orderBy: getOrderBy(watch("orderBy")),
    options: {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: ["data"],
      onSuccess(data) {
        setNotes(data);
      },
    },
  });

  const { mutate: createNote } = useCreateNote({
    options: {
      onSuccess(data) {
        setNotes((prev) => [data, ...prev]);
        handleFormReset();
      },
    },
  });

  const { mutate: updateNote } = useUpdateNote({
    options: {
      onSuccess(data) {
        setNotes(
          notes.map((note) => {
            if (note.id === data.id) {
              note = data;
            }
            return note;
          })
        );

        handleFormReset();
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

  const handleNoteSubmit = async () => {
    isEditForm
      ? await handleSubmit(handleUpdateNoteSubmit)()
      : await handleSubmit(handleNewNoteSubmit)();
  };

  const handleNewNoteSubmit = async ({
    title,
    note,
  }: {
    note: string;
    title?: string;
  }) => {
    await createNote({ note: { note, title }, email });
  };

  const handleUpdateNoteSubmit = async ({
    title,
    note,
  }: {
    note?: string;
    title?: string;
  }) => {
    if (updateNoteId) await updateNote({ title, note, noteId: updateNoteId });
  };

  const handleDeleteNote = async ({ noteId }: { noteId: string }) => {
    await deleteNote({ noteId });
  };

  const toggleModal = ({
    noteId,
    note,
    title,
  }: {
    noteId?: string;
    note?: string;
    title?: string | null;
  }) => {
    if (noteId) {
      setUpdateNoteId(noteId);
      if (note) setValue("note", note);
      if (title) setValue("title", title);
      setIsEditForm(true);
    }

    setIsModalOpen(!isModalOpen);
  };

  const handleFormReset = () => {
    setIsModalOpen(false);
    setIsEditForm(false);
    setUpdateNoteId(undefined);
    setValue("note", "");
    setValue("title", "");
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{`${email.split("@")[0]} - Notes`}</h1>
        <div className={styles.activityContainer}>
          <FormProvider {...searchMethods}>
            <Search />
          </FormProvider>
          <Button onClick={() => toggleModal({})}>Create Note</Button>
        </div>
        <div className={styles.notesContainer}>
          {isLoadingNotes ? (
            <ActivityIndicator />
          ) : (
            notes.map((note) => (
              <Note
                {...note}
                key={note.id}
                handleDelete={handleDeleteNote}
                sortByUpdated={watch("orderBy") === "Recently Updated"}
                toggleModal={() =>
                  toggleModal({
                    note: note.note,
                    title: note.title,
                    noteId: note.id,
                  })
                }
              />
            ))
          )}
        </div>
      </div>
      <FormProvider {...newNoteMethods}>
        <NoteModal
          isVisible={isModalOpen}
          handleClose={handleFormReset}
          handleSubmit={handleNoteSubmit}
          isEditForm={isEditForm}
        />
      </FormProvider>
    </>
  );
}
