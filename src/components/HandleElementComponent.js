import RegularDropdown from "./ui-kit/RegularDropdown";
import RegularInput from "./ui-kit/RegularInput";


const HandleElementComponent = ({ element, updateFieldsStates, renderTooltip, fields }) => {
  const type = element.type;
  console.log(type)

  return (
    <>
      {
        type === 'dropdown' ? <RegularDropdown
          controlId={element.field_id}
          label={element.field}
          value={fields[element.field_id]}
          onChange={(e) => { e.preventDefault(); updateFieldsStates(element.field_id, e.target.value) }}
          overlay={renderTooltip(element.comment)}
          innerData={element.options}
        /> : <></>
      }
      {
        type === 'input' ? <input
          className="regular-input-form-control"
          controlId={element.field_id}
          label={element.field}
          type={element.options[0] ? element.options[0] : 'text'}
          value={fields[element.field_id]}
          onChange={(e) => { updateFieldsStates(element.field_id, e.target.value) }}
        />
          : <></>
      }
    </>

  )

};

export default HandleElementComponent;
{/* <RegularInput
  controlId={element.field_id}
  label={element.field}
  type={element.options[0] ? element.options[0] : 'text'}
  value={fields[element.field_id]}
  onChange={(e) => { updateFieldsStates(element.field_id, e.target.value) }}
  overlay={renderTooltip(element.comment)}
/> */}