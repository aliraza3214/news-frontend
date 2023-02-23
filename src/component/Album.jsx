import AuthUser from './AuthUser'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { FormControl } from '@material-ui/core'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
})

function Album(props) {
    const { classes } = props
    const { logout } = AuthUser()
    const [items, setItems] = useState([])
    const [title, setTitle] = useState('')
    const [source, setSource] = useState('NewsAPI')
    const [category, setCategory] = useState('General')
    const [loading, setLoading] = useState(false)

    const fetchNewApi = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                `https://newsapi.org/v2/top-headlines?q=${title}&category=${category}&apiKey=3214bf22f3254cf882ef00922d085cf8`
            )
            if (res.status === 200) {
                setItems(res.data.articles)
            }
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const fetchGuardianNew = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                `https://content.guardianapis.com/search?q=${title}&api-key=09b6fd53-6633-430e-956a-f55dd315dd71`
            )
            if (res.status === 200) {
                setItems(
                    res.data.response.results.map((item) => {
                        return {
                            title: item.webTitle,
                            publishedAt: item.webPublicationDate,
                            urlToImage: null,
                            url: item.webUrl,
                        }
                    })
                )
            }
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const NytimeNew = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${title}&api-key=cHnHFhmnBppknQEqsWUFsd2q5smmhG2Q`
            )
            if (res.status === 200) {
                setItems(
                    res.data.response.docs.map((item) => {
                        return {
                            title: item.abstract,
                            description: item.lead_paragraph,
                            publishedAt: item.webPublicationDate,
                            urlToImage: null,
                            url: item.web_url,
                        }
                    })
                )
            }
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }
    const searchNews = () => {
        if (source === 'NewsAPI') fetchNewApi()
        else if (source === 'GuardianNews') fetchGuardianNew()
        else NytimeNew()
    }

    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar
                position="static"
                className={classes.appBar}
                color="secondary"
            >
                <Toolbar>
                    <Button onClick={logout} color="inherit">
                        logout
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid container spacing={2} justify="center">
                                    <Box sx={{ minWidth: 200, mt: 1 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Category
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={category}
                                                label="Category"
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                            >
                                                <MenuItem value="Business">
                                                    Business
                                                </MenuItem>
                                                <MenuItem value="Entertainment">
                                                    Entertainment
                                                </MenuItem>
                                                <MenuItem value="General">
                                                    General
                                                </MenuItem>
                                                <MenuItem value="Science">
                                                    Science
                                                </MenuItem>
                                                <MenuItem value="Ssports">
                                                    Sports
                                                </MenuItem>
                                                <MenuItem value="Technology">
                                                    Technology
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Grid item>
                                        <Box sx={{ minWidth: 200 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">
                                                    Sources
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={source}
                                                    label="Sources"
                                                    onChange={(e) =>
                                                        setSource(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <MenuItem value="NewsAPI">
                                                        NewsAPI
                                                    </MenuItem>
                                                    <MenuItem value="GuardianNews">
                                                        GuardianNews
                                                    </MenuItem>
                                                    <MenuItem value="NytimeNew">
                                                        NytimeNew
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box mb={1}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Title"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Button
                                    onClick={searchNews}
                                    color="primary"
                                    variant="contained"
                                >
                                    Search
                                </Button>
                            </Grid>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Stack
                        sx={{ width: '100%', color: 'grey.500' }}
                        spacing={2}
                    >
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                    </Stack>
                ) : (
                    <>
                        <div
                            className={classNames(
                                classes.layout,
                                classes.cardGrid
                            )}
                        >
                            {/* End hero unit */}

                            <Grid container spacing={1}>
                                {items.map((item, i) => (
                                    <Grid item key={i} sm={6} md={4} lg={3}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={item.urlToImage}
                                                title={item.title}
                                            />
                                            <CardContent
                                                className={classes.cardContent}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Typography>
                                                    {item.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    href={item.url}
                                                    target="_blank"
                                                >
                                                    View
                                                </Button>
                                                <Typography>
                                                    {item.publishedAt}
                                                </Typography>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </>
                )}
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    News
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Top-Headlines
                </Typography>
            </footer>
            {/* End footer */}
        </React.Fragment>
    )
}
Album.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Album)
