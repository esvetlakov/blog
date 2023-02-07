import { Button } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import classes from './articleForm.module.scss';

export default function ArticleForm({ type, send }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
  } = useForm({
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({ name: 'tags', control });

  const onSubmit = async ({ title, desc, text, tags }) => {
    const resp = await send({
      // eslint-disable-next-line
      article: { title: title, description: desc, body: text, tagList: tags.map((el) => el.name) },
    });
    if (resp.article) {
      navigate(`/articles/${resp.article.slug}`);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.title}>{type === 'new' ? 'Create new article' : 'Edit article'}</h2>
      <label className={!errors.title ? classes.label : `${classes.label} ${classes.err}`}>
        Title
        <input
          type="text"
          placeholder="Title"
          className={classes.input}
          {...register('title', {
            required: 'Title is required!',
            minLength: {
              value: 5,
              message: 'Title length should be 5 to 140 characters',
            },
            maxLength: {
              value: 140,
              message: 'Title length should be 5 to 140 characters',
            },
          })}
        />
        <div className={classes.errMsg}>{errors?.title && <span>{errors?.title?.message || 'Error'}</span>}</div>
      </label>
      <label className={!errors.desc ? classes.label : `${classes.label} ${classes.err}`}>
        Short description
        <input
          type="text"
          placeholder="Short description"
          className={classes.input}
          {...register('desc', {
            required: 'Short description is required!',
            minLength: {
              value: 5,
              message: 'Short description length should be 5 to 300 characters',
            },
            maxLength: {
              value: 300,
              message: 'Short description length should be 5 to 300 characters',
            },
          })}
        />
        <div className={classes.errMsg}>{errors?.desc && <span>{errors?.desc?.message || 'Error'}</span>}</div>
      </label>
      <label className={!errors.text ? classes.label : `${classes.label} ${classes.err}`}>
        Text
        <textarea
          className={classes.input}
          placeholder="Text"
          {...register('text', { required: 'Title is required!' })}
        />
        <div className={classes.errMsg}>{errors?.text && <span>{errors?.text?.message || 'Error'}</span>}</div>
      </label>
      <label className={classes.label}>Tags</label>
      {fields.length === 0 && (
        <div>
          <Button type="add-tag" size="large" ghost className={classes.addTag} onClick={() => append({ name: '' })}>
            Add tag
          </Button>
        </div>
      )}
      {fields.map((field, rowIndex) => (
        <div className={classes.label} key={field.id}>
          <div>
            <input
              type="text"
              placeholder="Tag"
              className={classes.input}
              defaultValue={fields.length}
              {...register(`tags.${rowIndex}.name`, {
                // eslint-disable-next-line
                required: "Tag is required! If you don't want to provide the tag, please delete it",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'You can use only english letters and digits',
                },
                validate: (tagInputValue) =>
                  !getValues()
                    .tags.map((tag) => tag.name)
                    .filter((_, current) => rowIndex !== current)
                    .includes(tagInputValue) || 'Tag must be unique!',
              })}
            />
            <Button value="Delete" size="large" className={classes.removeTag} onClick={() => remove(rowIndex)}>
              Delete
            </Button>
            {fields.length - 1 === rowIndex && (
              <Button value="Add tag" size="large" className={classes.addTag} onClick={() => append({ name: '' })}>
                Add tag
              </Button>
            )}
          </div>
          {errors?.tags?.[rowIndex] && (
            <span className={classes.tagErr}>{errors?.tags?.[rowIndex]?.name?.message?.toString()}</span>
          )}
        </div>
      ))}
      <input type="submit" className={classes.submit} value="Send" />
    </form>
  );
}
