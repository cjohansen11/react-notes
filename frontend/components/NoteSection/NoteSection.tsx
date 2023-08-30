import styles from "./noteSection.module.css";
import { useState } from "react";
import { Button, NoteModal, Search } from "..";
import { useForm, FormProvider } from "react-hook-form";
import { NoteFormSchema, NoteFormType } from "@/types/Forms";
import { zodResolver } from "@hookform/resolvers/zod";

export type NoteSectionProps = {
  email: string;
};

export default function NoteSection({ email }: NoteSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newNoteMethods = useForm<NoteFormType>({
    resolver: zodResolver(NoteFormSchema),
  });
  const { handleSubmit } = newNoteMethods;

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
      </div>
      <FormProvider {...newNoteMethods}>
        <NoteModal
          isVisible={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        />
      </FormProvider>
    </>
  );
}
