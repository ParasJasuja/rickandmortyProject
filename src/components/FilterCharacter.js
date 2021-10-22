import React from "react"

const FilterCharacter = props => {
  return (
    <div className="filter-container">
      <h3>Filter</h3>
      <select
        value={props.filterValue}
        onChange={e => props.setFilterValue(e.target.value)}
      >
        <option value="any">Any</option>
        <optgroup label="Type">
          {props.types.map(t => (
            <option key={t} value={t.toLowerCase()}>
              {t}
            </option>
          ))}
        </optgroup>
        <optgroup label="Status">
          {props.status.map(s => (
            <option key={s} value={s.toLowerCase()}>
              {s}
            </option>
          ))}
        </optgroup>
        <optgroup label="Species">
          {props.species.map(s => (
            <option key={s} value={s.toLowerCase()}>
              {s}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  )
}

export default FilterCharacter
