import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

class Offsidebar extends Component {

    state = {
        activeTab: 'settings',
        offsidebarReady: false
    }

    componentDidMount() {
        // When mounted display the offsidebar
        this.setState({offsidebarReady: true});
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleSettingCheckbox = event => {
        this.props.actions.changeSetting(event.target.name, event.target.checked);
    }

    handleThemeRadio = event => {
        this.props.actions.changeTheme(event.target.value);
    }

    render() {

        return (
            this.state.offsidebarReady &&
            <aside className="offsidebar">
                { /* START Off Sidebar (right) */}
                <nav>
                    <div>
                        { /* Nav tabs */}
                        <Nav tabs justified>
                            <NavItem>
                                <NavLink className={this.state.activeTab === 'settings' ? 'active' : ''}
                                         onClick={() => {
                                             this.toggle('settings');
                                         }}
                                >
                                    <em className="icon-equalizer fa-lg"></em>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        { /* Tab panes */}
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="settings">
                                <h3 className="text-center text-thin mt-4">Settings</h3>
                                <div className="p-2">
                                    <h4 className="text-muted text-thin">Themes</h4>
                                    <div className="row row-flush mb-2">
                                        <div className="col-3 mb-3">
                                            <div className="setting-color">
                                                <label>
                                                    <input type="radio" name="setting-theme"
                                                           checked={this.props.theme.path === 'themes/theme-ewallet.css'}
                                                           value='themes/theme-ewallet.css'
                                                           onChange={this.handleThemeRadio}/>
                                                    <span className="icon-check"></span>
                                                    <span className="split">
                                                        <span className="color bg-info"></span>
                                                        <span className="color bg-info-light"></span>
                                                    </span>
                                                    <span className="color bg-gray-dark"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-3 mb-3">
                                            <div className="setting-color">
                                                <label>
                                                    <input type="radio" name="setting-theme"
                                                           checked={this.props.theme.path === 'themes/theme-vodacom.css'}
                                                           value='themes/theme-vodacom.css'
                                                           onChange={this.handleThemeRadio}/>
                                                    <span className="icon-check"></span>
                                                    <span className="split">
                                                        <span className="color bg-green"></span>
                                                        <span className="color bg-green-light"></span>
                                                    </span>
                                                    <span className="color bg-gray-light"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </nav>
                { /* END Off Sidebar (right) */}
            </aside>
        );
    }

}

Offsidebar.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object,
    theme: PropTypes.object
};

const mapStateToProps = state => ({settings: state.settings, theme: state.theme})
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Offsidebar);
