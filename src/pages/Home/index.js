import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "../../components/Card";
import * as S from "./styles";
import {
  historicFinances,
  insertItem,
  updateItem,
} from "../../api/routes/finances";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import EnhancedTable from "../../components/Table";
import { useItem } from "../../context/useItem";
import { Player } from "@lottiefiles/react-lottie-player";
import { format } from "date-fns";

function ControllerTextField({ label, name, control, errors, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          error={errors}
          helperText={errors?.message}
          {...props}
          {...field}
        />
      )}
    />
  );
}

const Home = () => {
  const [historic, setHistoric] = useState([]);
  const { item } = useItem();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      operation: "",
      category: "",
      value_item: "",
    },
    // resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchHistoricFinances = async () => {
      const response = await historicFinances();
      setHistoric(response);
    };

    fetchHistoricFinances();
  }, []);

  useEffect(() => {
    if (item) {
      setValue("title", item.title);
      setValue("operation", item.operation);
      setValue("category", item.category);
      setValue("value_item", item.value_item);
    }
  }, [item, setValue]);

  console.log("Re-rendering...");
  const onSubmit = async (data) => {
    try {
      const dateToday = new Date();
      const dateFormatted = format(dateToday, "dd-MM-yyyy");

      if (item) {
        await updateItem(item.id, {
          ...data,

          date_input: dateFormatted,
        });
      } else {
        await insertItem({
          ...data,
          date_input: dateFormatted,
        });
      }

      reset();
    } catch (error) {
      console.log("🚀 ~ file: App.js:72 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <S.Wrapper>
      <S.WrapperSectionForm>
        <S.WrapperForm method="post" onSubmit={handleSubmit(onSubmit)}>
          <ControllerTextField
            name="title"
            label="Título"
            control={control}
            errors={errors?.title}
          />

          <Controller
            name="operation"
            control={control}
            render={({ field }) => {
              return (
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  row
                  {...field}
                >
                  <FormControlLabel
                    value="entrada"
                    control={<Radio />}
                    label="Entrada"
                  />
                  <FormControlLabel
                    value="saída"
                    control={<Radio />}
                    label="Saída"
                  />
                </RadioGroup>
              );
            }}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select title="category" label="Categoria" {...field}>
                <MenuItem value="educacao">Educação</MenuItem>
                <MenuItem value="lazer">Lazer</MenuItem>
                <MenuItem value="saude">Saúde</MenuItem>
              </Select>
            )}
          />

          <ControllerTextField
            label="Valor(R$)"
            name="value_item"
            control={control}
            errors={errors?.title}
          />
          <Button variant="outlined" onClick={() => reset()}>
            Limpar
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Cadastrar
          </Button>
        </S.WrapperForm>
        <Player
          src="https://lottie.host/9e26f999-7f63-4871-b6b8-91bb63f502e7/KdKBd17XAo.json"
          className="player"
          loop
          autoplay
        />
      </S.WrapperSectionForm>

      <S.WrapperCard>
        <Card type="entrada" value="1" />
        <Card type="saída" value="2" />
        <Card type="total" value="3" />
      </S.WrapperCard>

      {historic.length > 0 ? (
        <EnhancedTable data={historic} />
      ) : (
        <p>Loading...</p>
      )}
    </S.Wrapper>
  );
};

export default Home;
