import Card from "../Card/Card";
import styles from "../Cards/Cards.module.css";

export default function Cards(props) {
  const { characters } = props;

  return (
    <div className={styles.div}>
      {characters.map(({ id, name, species, origin, gender, image }) => (
        <Card
          id={id}
          key={id}
          name={name}
          species={species}
          gender={gender}
          origin={origin.name}
          image={image}
          onClose={() => props.onClose(id)}
        />
      ))}
    </div>
  );
}
