
const styles = {
    background: 'transparent',
    border: 0
};

export const ButtonIcon = ({icon, onClick}) =>{
    return  <button style={styles} onClick = { onClick }>
                {icon}
            </button>
}