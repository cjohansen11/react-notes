import styles from "./search.module.css";
import { Input } from "..";
import { Controller, useFormContext } from "react-hook-form";
import { SearchFormType } from "@/types";

export default function Search() {
  const selectOptions = ["Newest", "Oldest", "Recently Updated"];

  const { control } = useFormContext<SearchFormType>();

  return (
    <div className={styles.container}>
      <Controller
        control={control}
        name="query"
        render={({ field }) => (
          <Input
            placeholder="Search notes"
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="orderBy"
        render={({ field }) => (
          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            >
              {selectOptions.map((sortOption) => (
                <option key={sortOption}>{sortOption}</option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
}
