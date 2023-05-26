import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../../styles/DocumentsPage.css';

const DocumentsPage = () => {
  const [selectedPoint, setSelectedPoint] = useState(0);

  const points = [
    "Пункт 1",
    "Пункт 2",
    "Пункт 3",
    "Пункт 4",

  ]

  useEffect(() => {
    const handleScroll = () => {
      setSelectedPoint(0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePointClick = (index) => {
    setSelectedPoint(index);

  };

  return (
    <Container>
      <div className='docs-row'>
        <Col md={3} className='position-static docs-col-1'>
          <h1 className='h1-docs'>Документы</h1>
          <ul className='p-0'>
            {points.map((point, index) => (
              <li
                className='docs-li'
                key={index}

              ><a
                className={'text-decoration-none point' + (selectedPoint === index ? ' choosed-point' : '')}
                href={'#p' + (index + 1)}
                onClick={() => handlePointClick(index)}

              >
                  {point}
                </a>

              </li>
            ))}
          </ul>

        </Col>
        <div className='docs-col' >
          <div className='text-left'>
            <h2 id='p1'>1. Общие положения</h2>
            <p>1.1.Настоящее пользовательское соглашение(далее по тексту — «Соглашение») определяет
              условия для доступа и использования Сайта, мобильных версий Сайта, мобильных приложений
              и иных интернет - порталов, принадлежащих Администратору, управляемых Администратором,
              доступ к которым предоставляет Администратор.</p>
            <p>
              1.2.Настоящий документ является юридически обязывающим соглашением между Вами как
              Пользователем(Пользователями) Сайта и Владельцем Сайта, заключающим Соглашение.
            </p>
            <p>1.3.Соглашение, является публичной офертой в соответствии со ст. 435 и п. 2 ст. 437 Гражданского
              кодекса Российской Федерации.</p>
            <p>
              1.4.Начиная использовать Сайт и / или его отдельные функции, Продукты Владельца Сайта, либо
              пройдя процедуру регистрации Пользователем на Сайте, Пользователь считается принявшим
              условия Соглашения в полном объеме, без всяких оговорок и исключений.
            </p>
            <h2></h2>
            <h2 id='p2'>2. Предмет Соглашения</h2>
            <p>2.1.Владелец Сайта предоставляет Пользователю право на использование Сайта, его отдельных
              функций и / или Продуктов Владельца Сайта в соответствии с условиями настоящего Соглашения.
            </p>
            <p>
              2.2.Пользователь несет ответственность за сохранность конфиденциальности информации
              своей учетной записи, включая пароль, а также за всю без исключения деятельность, которая
              ведется на Сайте под его учетной записью.
            </p>
            <p>
              2.3.Пользователь обязуется незамедлительно уведомить Владельца Сайта о любом случае
              несанкционированного(неавторизованного) доступа к его учетной записи и / или нарушении
              безопасности его учетной записи.
            </p>
            <p>
              2.4.Владелец Сайта не несет ответственности за любой ущерб или убытки, возникшие в
              результате несоблюдения Пользователем условий настоящего Соглашения, в том числе
              ответственности за любой ущерб, причиненный Пользователю в результате использования
              Сайта.
            </p>
            <h2 id='p3'>3. Условия оказания услуг</h2>
            <p>3.1.Договор оказания услуг считается заключенным между Владельцем Сайта и Пользователем с
              момента начала использования Сайта или отдельных Продуктов Владельца Сайта.
            </p>
            <p>
              3.2.В Продуктах Владельца Сайта могут быть представлены платные и бесплатные услуги,
              которыми может воспользоваться Пользователь.Услуги могут быть представлены Владельцем
              Сайта и / или третьими лицами, с которыми у Владельца Сайта есть договорные отношения.
              Условия получения тех или иных услуг размещены в специальных разделах интерфейса Сайта.
              Перед началом использования соответствующего Продукта Владельца Сайта Пользователь
              обязуется внимательно знакомиться с правилами и условиями получения соответствующей
              услуги.В случае несогласия с условиями получения соответствующей услуги и / или Соглашения
              Пользователь должен воздержаться от использования соответствующего Продукта Владельца
              Сайта и / или Сервиса.
            </p>
            <p>
              3.3.Пользователь согласен с тем, что Владелец Сайта вправе в любое время расширить, ограничить,
              изменить перечень как платных, так и бесплатных услуг Владельца Сайта.
            </p>
            <h2 id='p4'>4. Регистрация на Сайте</h2>
            <p>
              4.1.Для того чтобы воспользоваться Сайтом или некоторыми отдельными функциями и / или
              Сервисами Сайта, Пользователю необходимо пройти процедуру регистрации, в результате
              которой для Пользователя будет создан уникальный личный кабинет.
            </p>
            <p>
              4.2.Для регистрации Пользователь обязуется предоставить достоверную и полную информацию о
              себе по вопросам, предлагаемым в форме регистрации, и поддерживать эту информацию в
              актуальном состоянии.Если Пользователь предоставляет неверную информацию или у
              Владельца Сайта есть основания полагать, что предоставленная Пользователем информация
              неполная и / или недостоверная, Владелец Сайта имеет право, по своему усмотрению,
              заблокировать либо удалить личный кабинет Пользователя и отказать Пользователю в
              использовании Cайта(либо его отдельных функций и / или Сервисов).
            </p>
            <p>
              4.3.Если Пользователем не доказано обратное, любые действия, совершенные с использованием его
              логина и пароля, считаются совершенными соответствующим Пользователем.
            </p>
            <p>
              4.4.Пользователь осознает и соглашается с тем, что Владелец Сайта вправе проводить
              опубликование и дальнейшее использование указанного Пользователем имени и / или
              наименования в комментариях и отзывах на Сайте, в рекламных продуктах, корпоративных
              блогах и аккаунтах Владельца Сайта на сторонних ресурсах.
            </p>
          </div>
        </div>
      </div>

    </Container>
  );
};

export default DocumentsPage;
