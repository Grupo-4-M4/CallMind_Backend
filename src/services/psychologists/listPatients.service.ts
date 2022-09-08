import AppDataSource from "../../data-source";
import { Patient } from "../../entities/patient.entity";
import { Psychologist } from "../../entities/psychologist.entity";

import { Schedule } from "../../entities/schedule.entity";

const listPatientsService = async (id: string) => {
  const psychologistRepository = AppDataSource.getRepository(Psychologist);

  const psychologist = await psychologistRepository.findOne({
    relations: { user: true },
    where: { user: { id: id } },
  });

  // const patients = await AppDataSource.getRepository(Schedule)
  //   .createQueryBuilder("schedules")
  //   .innerJoinAndSelect("schedules.patient", "pat")
  //   .innerJoinAndSelect("schedules.psychologist", "psychologist")
  //   .select(["pat.name", "pat.id"])
  //   .where("psychologist.id = :id AND schedules.available = false", {
  //     id: psychologist!.id,
  //   })
  //   .groupBy("pat.id")
  //   .getMany();

  const schedulesfalse = psychologist!.schedules.filter(
    (schedule) => schedule.available === false
  );

  const patientArr: Patient[] = [];

  schedulesfalse?.forEach((schedule) => {
    const verify = patientArr.find(
      (patient) => patient.id === schedule.patient.id
    );
    if (!verify) {
      patientArr.push(schedule.patient);
    }
  });

  return patientArr;
};

export default listPatientsService;
