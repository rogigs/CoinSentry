import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Player } from "@lottiefiles/react-lottie-player";
import { format } from "date-fns";
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
import ResumeFinances from "./components/ResumeFinances";
import { Skeleton } from "@mui/material";

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

function Home() {
  const [historic, setHistoric] = useState([]);
  const [wasDeleteItem, setWasDeleteItem] = useState(false);

  const [loading, setLoading] = useState(true);
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

  const fetchHistoricFinances = async () => {
    const response = await historicFinances();
    setHistoric(response);
  };

  useEffect(() => {
    if (isSubmitting || wasDeleteItem) {
      fetchHistoricFinances();
    }
  }, [isSubmitting, wasDeleteItem]);

  useEffect(() => {
    fetchHistoricFinances();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (item) {
      Object.keys(item).forEach((key) => setValue(key, item[key]));
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    try {
      const dateToday = new Date();
      const dateFormatted = format(dateToday, "dd-MM-yyyy");
      const objItem = {
        ...data,
        date_input: dateFormatted,
      };

      if (item) {
        await updateItem(item.id, objItem);
      } else {
        await insertItem(objItem);
      }

      reset();
    } catch (error) {
      console.error(error);
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
            render={({ field }) => (
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
            )}
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

      <ResumeFinances />
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height="500px" />
      ) : (
        <EnhancedTable
          data={historic}
          loadingRow={isSubmitting}
          setWasDeleteItem={setWasDeleteItem}
        />
      )}
    </S.Wrapper>
  );
}

export default Home;
