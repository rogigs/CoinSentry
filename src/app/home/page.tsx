'use client';

import { useForm } from 'react-hook-form';

import { Player } from '@lottiefiles/react-lottie-player';
import * as S from './styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './validationSchema';
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

export default function Home() {
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      reset();
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return (
    <S.Wrapper>
      <S.WrapperSectionForm>
        <S.WrapperForm method="post" onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Título" />

          <InputLabel>Categoria</InputLabel>
          <Select label="Categoria" title="category">
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
              name="controlled-radio-buttons-group"
              row
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
          <TextField label="Valor" />

          <Button variant="outlined" onClick={() => reset()}>
            Limpar
          </Button>
          <Button type="submit">Cadastrar</Button>
        </S.WrapperForm>
        <Player
          src="https://lottie.host/9e26f999-7f63-4871-b6b8-91bb63f502e7/KdKBd17XAo.json"
          className="player"
          loop
          autoplay
        />
      </S.WrapperSectionForm>
    </S.Wrapper>
  );
}
