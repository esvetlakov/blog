import classes from './likeButton.module.scss';

export default function LikeButton({ favorited, isAuth, favoritesCount, likeClick, slug }) {
  return (
    <div className={classes.wrap}>
      <label>
        <input
          type="checkbox"
          className={classes.input}
          defaultChecked={favorited}
          onChange={(e) => likeClick(slug, e.target.checked)}
          disabled={!isAuth}
        />
        <span className={`${classes.customBox} ${isAuth ? '' : classes.disable}`} />
      </label>
      <span className={classes.count}>{favoritesCount}</span>
    </div>
  );
}
