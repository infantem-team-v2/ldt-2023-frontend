import { Form } from "react-bootstrap";
import HandleElementComponent from "./HandleElementComponent";
import RegularButton from "./ui-kit/RegularButton";
import { nanoid } from 'nanoid';



const HandleCategoryComponent = ({ handleNextStep, currentStep, categories, category, fields, isHidden, renderTooltip, updateFieldsStates }) => {
  const hidden = isHidden(category.category_id);

  return (
    <>
      {hidden ? <div key={nanoid()}></div> :
        <Form
          className='calculator-category'
          key={nanoid()}
          id={category.category_id}
        >
          <h2>{category.category}</h2>
          <div className='calculator-div-categories' key={nanoid()}>
            {category.elements.map((element) =>
            (<HandleElementComponent
              element={element}
              renderTooltip={renderTooltip}
              updateFieldsStates={updateFieldsStates}
              fields={fields}
            />))}
          </div>

          <div className='calculator-control-block'>
            {currentStep === categories.length ? <p className='p-logo calculator-sign'>
              Нажимая на кнопку вы принимайте условия <a href="/documents">пользовательского соглашения</a>
            </p> : <></>}
            <RegularButton
              className='mt-2'
              text={currentStep === categories.length ? 'Получить результат' : 'Далее'}
              onClick={handleNextStep}
            />
          </div>
        </Form>}
    </>

  );
};
export default HandleCategoryComponent;