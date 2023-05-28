import { useEffect, useState } from "react";

import api from "../services/api";

import RegularModalFormControl from "./ui-kit/RegularModalFormControl";
import RegularButton from "./ui-kit/RegularButton";
import Swal from "sweetalert2";
import RegularModalDropdown from "./ui-kit/RegularModalDropdown";


const UserDataBlock = () => {

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);
  const [isChanges, setIsChanges] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [organizationList, setOrganizationList] = useState([]);


  const [economic_activity, setEconomic_activity] = useState('');
  const [inn, setInn] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [geography, setGeography] = useState('');
  const [jobPosition, setJobPosition] = useState('');


  const fetchInnerData = async () => {
    try {
      const response = await api.get("/calc/fields");
      const dataJson = await response.data.data.industries;
      setOrganizationList(dataJson);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    api.get('/account/info', {
      params: {
        page: 1,
        limit: 10
      }
    }).catch(err => { setError(true); console.log(err) }).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        setUserData(res.data);
        fetchInnerData();
      }

    });
  }, []);

  useEffect(() => {
    if (userData) {
      handleData(userData);
      setIsDataLoaded(true);
    }
  }, [userData, organizationList]);

  const handleData = (data) => {
    try {
      setEconomic_activity(data.business_data.economic_activity);
      setInn(data.business_data.inn);
      setName(data.business_data.name);
      setWebsite(data.business_data.website);
      setEmail(data.personal_data.email);
      setFullName(data.personal_data.full_name);
      setGeography(data.personal_data.geography);
      setJobPosition(data.personal_data.job_position);
    } catch (err) {
      return err;
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put('/account/info', {
      business_data: {
        economic_activity: economic_activity,
        inn: inn,
        name: name,
        website: website
      },
      personal_data: {
        email: email,
        full_name: fullName,
        geography: geography,
        job_position: jobPosition
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: 'Произошла ошибка при сохранении данных. Попробуйте еще раз.',
      })

    }).then((res) => {
      setIsChanges(false);
      Swal.fire({
        icon: 'success',
        title: 'Успех',
        text: 'Данные успешно сохранены.',
      })
    });
  };

  const controlBlock = () => {
    if (isChanges) {
      return (
        <div className="user-block-control">
          <RegularButton
            text="Отменить"
            type="button"
            onClick={() => { setIsChanges(false); handleData(userData) }}
          />
          <RegularButton
            text="Сохранить"
            type="submit"
            onClick={handleSubmit}
          />
        </div>
      )
    } else {
      return (
        <div className="user-block-control">
          <RegularButton
            text="Изменить"
            type="button"
            onClick={() => { setIsChanges(true) }}
          />
        </div>
      )
    }
  };


  return (<>{
    isDataLoaded ?
      error ? <>
        <div className="alert alert-danger data m-3" role="alert">
          Произошла ошибка при загрузке результатов.
          Возможно вы не авторизованы?
        </div>
      </>
        :
        <div className="container">
          < div className="user-block-div" >
            <h2 className="user-block-head">Персональные данные</h2>
            <form className="form user-block-form">
              <RegularModalFormControl
                label="Email"
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => { setIsChanges(true); setEmail(e.target.value) }}
              />
              <RegularModalFormControl
                label="ФИО"
                type="text"
                placeholder="Введите ФИО"
                value={fullName}
                onChange={(e) => { setIsChanges(true); setFullName(e.target.value) }}
              />
              <RegularModalFormControl
                label="Местоположение"
                type="text"
                placeholder="Введите местоположение"
                value={geography}
                onChange={(e) => { setIsChanges(true); setGeography(e.target.value) }}
              />
              <RegularModalFormControl
                label="Должность"
                type="text"
                placeholder="Введите должность"
                value={jobPosition}
                onChange={(e) => { setIsChanges(true); setJobPosition(e.target.value) }}
              />
            </form>
          </div >
          <div className="user-block-div">
            <h2 className="user-block-head">Данные о предприятии</h2>
            <form className="form user-block-form">
              <RegularModalDropdown
                label="Вид деятельности"
                type="text"
                placeholder="Выберите вид деятельности"
                value={economic_activity}
                onChange={(e) => { setIsChanges(true); setEconomic_activity(e.target.value) }}
                options={organizationList ? organizationList : ["Загрузка..."]}
              />
              <RegularModalFormControl
                label="ИНН"
                type="text"
                placeholder="Введите ИНН"
                value={inn}
                onChange={(e) => { setIsChanges(true); setInn(e.target.value) }}
              />
              <RegularModalFormControl
                label="Название предприятия"
                type="text"
                placeholder="Введите название предприятия"
                value={name}
                onChange={(e) => { setIsChanges(true); setName(e.target.value) }}
              />
              <RegularModalFormControl
                label="Сайт предприятия"
                type="text"
                placeholder="Введите сайт предприятия"
                value={website}
                onChange={(e) => { setIsChanges(true); setWebsite(e.target.value) }}
              />
            </form>
          </div>
          {controlBlock()}
        </div > :
      <div className='mt-5 d-flex justify-content-center align-items-center' >
        <div className="spinner-border regular-spinner" role="status" />
      </div>
  }
  </>
  )
};

export default UserDataBlock;