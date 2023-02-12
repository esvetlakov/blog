import { Tag } from 'antd';
import { uid } from 'uid/single';

export default function getTags(tags, name) {
  return tags.map((el) => {
    if (el !== '') {
      return (
        <Tag className={name} key={uid(20)}>
          {el.slice(0, 40)}
        </Tag>
      );
    }
    return null;
  });
}
