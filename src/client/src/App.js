import React, { useCallback, useState, useRef } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";

import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useInitialiseGraph } from "./hooks/api/useInitialiseGraph";

import { EntryFilePicker } from "./components/EntryFilePicker";
import { ChunksPicker } from "./components/ChunksPicker";

import pcImg from "./pc.svg";

import "./App.css";

const useStyles = makeStyles((theme) => ({
	flexNone: { flex: "0 0 auto" },
	flex1: { flex: "1", minHeight: "0" },
	logo: {
		flex: "0 0 auto",
		height: 64,
		width: 64,
		marginRight: theme.spacing(2),
	},
	shortcutIcon: { flex: "0 0 auto" },
	popover: {
		width: "350px",
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	shortcutCmd: {
		width: "100px",
		flex: "0 0 auto",
		fontWeight: "700",
	},
}));

const clickInfo = [
	{
		cmd: "Click",
		desc: "Select/Deselect",
	},
	{
		cmd: "⌘ + Click",
		desc: "Select/Deselect Subgraph",
	},
];
const shortcutsInfo = [
	{
		cmd: "s",
		desc: "Select",
	},
	{
		cmd: "p",
		desc: "Select Subgraph",
	},
	{
		cmd: "x",
		desc: "Deselect",
	},
	{
		cmd: "d",
		desc: "Deselect Subgraph",
	},
];

function App() {
	const classes = useStyles();
	const loading = useInitialiseGraph();
	const [entryFile, setEntryFile] = useLocalStorage("pick-entry", {
		filepath: "",
		name: "",
	});
	const btnRef = useRef();
	const [showPopover, setPopoverVisibility] = useState(false);
	const handleShortcutClick = useCallback(() => {
		setPopoverVisibility(true);
	}, []);
	const hideShortcutPopover = useCallback(() => {
		setPopoverVisibility(false);
	}, []);

	return (
		<Box padding={5} display="flex" flexDirection="column" height="100%">
			<Box
				display="flex"
				flex="0 0 auto"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Box display="flex" flex="0 0 auto" alignItems="center">
					<img className={classes.logo} src={pcImg} alt="logo" />
					<Typography variant="h4" color="textPrimary">
						Pick Chunks
					</Typography>
				</Box>
				<IconButton
					onClick={handleShortcutClick}
					ref={btnRef}
					aria-label="shortcuts"
					className={classes.shortcutIcon}
				>
					<KeyboardIcon fontSize="large" />
				</IconButton>
				<Popover
					id="shortcuts"
					open={showPopover}
					anchorEl={btnRef.current}
					onClose={hideShortcutPopover}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
				>
					<List
						component="nav"
						className={classes.popover}
						aria-label="shortcuts popover"
					>
						{clickInfo.map(({ cmd, desc }, index) => (
							<ListItem divider={index === clickInfo.length - 1}>
								<Box display="flex" alignItems="center" flex="1">
									<ListItemText className={classes.shortcutCmd}>
										<Typography color="secondary">
											<Box
												component="span"
												// border={1}
												// padding={1}
												// borderRadius="borderRadius"
												// borderColor="text.primary"
											>
												{cmd}
											</Box>
										</Typography>
									</ListItemText>
									<ListItemText primary={desc} />
								</Box>
							</ListItem>
						))}
						{shortcutsInfo.map(({ cmd, desc }, index) => (
							<ListItem>
								<Box display="flex" alignItems="center" flex="1">
									<ListItemText className={classes.shortcutCmd}>
										<Typography color="secondary">{cmd}</Typography>
									</ListItemText>
									<ListItemText primary={desc} />
								</Box>
							</ListItem>
						))}
					</List>
				</Popover>
			</Box>
			{loading ? (
				<Typography component="div" variant="h4">
					<Skeleton />
				</Typography>
			) : (
				<>
					<EntryFilePicker
						className={classes.flexNone}
						entryFile={entryFile}
						onEntryFileChange={setEntryFile}
					/>
					<ChunksPicker className={classes.flex1} entryFile={entryFile} />
				</>
			)}
		</Box>
	);
}

export default App;
