import styles from "./noteSection.module.css";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Note, NoteModal, Search } from "..";
import { useForm, FormProvider, Form } from "react-hook-form";
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
} from "@/hooks";
import { title } from "process";

export type NoteSectionProps = {
  user: User;
};

export default function NoteSection({
  user: { email, id: userId },
}: NoteSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isEditForm, setIsEditForm] = useState(false);

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
      query: "",
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
        setIsModalOpen(false);
        setValue("note", "");
        setValue("title", "");
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

  const handleNewNoteSubmit = async ({
    title,
    note,
  }: {
    note: string;
    title?: string;
  }) => {
    await createNote({ note: { note, title }, email });
  };

  const handleDeleteNote = async ({ noteId }: { noteId: string }) => {
    await deleteNote({ noteId });
  };

  const toggleModal = ({
    note,
    title,
  }: {
    note?: string;
    title?: string | null;
  }) => {
    if (title || note) {
      if (note) setValue("note", note);
      if (title) setValue("title", title);
      setIsEditForm(true);
    }

    setIsModalOpen(!isModalOpen);
  };

  const handleFormReset = () => {
    setIsModalOpen(false);
    setIsEditForm(false);
    setValue("note", "");
    setValue("title", "");
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{`${email.split("@")[0]}'s Notes`}</h1>
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
                toggleModal={() =>
                  toggleModal({ note: note.note, title: note.title })
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
          handleSubmit={() => handleSubmit(handleNewNoteSubmit)()}
          isEditForm={isEditForm}
        />
      </FormProvider>
    </>
  );
}
