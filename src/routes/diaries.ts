import express from 'express';
import * as diaryServices from '../services/diaryServices';
import toNewDiaryEntry from '../utils';

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithOutSensitiveInfo());
})

router.get('/:id', (req, res) => {
  //paso el parametro a number por que viene como string
  const diary = diaryServices.findById(Number(req.params.id))   // o con (+req.params.id)  
  return diary
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try{
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router;