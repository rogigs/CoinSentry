'use client';

import { useForm } from 'react-hook-form';
import { Player } from '@lottiefiles/react-lottie-player';
import * as S from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  validationSchema,
  defaultValues,
  DefaultValues,
} from './validationSchema';
import {
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
  Button,
  TextField,
} from '@mui/material';
import ResumeFinances from './components/ResumeFinances';
import { useFinances } from './hooks/useFinances';
import { useEffect } from 'react';

export default function Home() {
  const { historic, historicDetails, fetchHistoric } = useFinances();

  const { handleSubmit, reset, register, formState } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetchHistoric();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log('🚀 ~ onSubmit ~ data:', data);

      fetchHistoric();

      reset();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  console.log('🚀 ~ Home ~ DefaultValues.title:', DefaultValues.title);
  return (
    <S.Wrapper>
      <S.WrapperSectionForm>
        <S.WrapperForm method="post" onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Título" {...register(DefaultValues.title)} />

          <InputLabel>Categoria</InputLabel>
          <Select
            label="Categoria"
            title="category"
            {...register(DefaultValues.category)}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value="educacao">Educação</MenuItem>
            <MenuItem value="lazer">Lazer</MenuItem>
            <MenuItem value="saude">Saúde</MenuItem>
            <MenuItem value="saude">Trabalho</MenuItem>
          </Select>
          {/* TODO: Have problems */}
          <S.FormControlRadio>
            <FormLabel id="demo-radio-buttons-group-label">Operação:</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              row
              {...register(DefaultValues.operation)}
            >
              <S.FormControlLabel
                value="entrada"
                control={<Radio />}
                label="Entrada"
              />
              <S.FormControlLabel
                value="saída"
                control={<Radio />}
                label="Saída"
              />
            </RadioGroup>
          </S.FormControlRadio>
          <TextField label="Valor" {...register(DefaultValues.valueItem)} />

          <Button variant="outlined" onClick={() => reset()}>
            Limpar
          </Button>
          <Button variant="contained" type="submit">
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

      <ResumeFinances details={historicDetails} />
    </S.Wrapper>
  );
}
