import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: '12px',
    padding: '10px'
  },
})

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 2,
//   border: 'solid',
//   borderWidth: 1,
//   marginBottom: 5,
//   width: '400px',
// }

const BlogList = ({ blog }) => {
  const classes = useStyles()

  return (
    <Card className={(classes.root, classes.pos)} variant="outlined">
      <CardContent>
        <Link to={`/blogs/${blog.id}`}>
          <Typography
            className={(classes.title, 'blogTitle')}
            color="textSecondary"
            gutterBottom
          >
            {blog.title} {' by '} {blog.author}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default BlogList
